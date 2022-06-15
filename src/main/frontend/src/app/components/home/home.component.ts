import { Component, OnInit } from '@angular/core';
import { Rating } from '../../types/Rating';
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { LoginStateService } from 'src/app/services/login-state.service';
import { DataService } from 'src/app/services/data.service';
import { IceCream } from 'src/app/types/IceCream';
import { Router } from '@angular/router';

function availableOptionsValid(options: string[]): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    let brand = c.value;
    if (options.includes(brand) == false) {
      // console.log(options)
      return { 'brandOption': true };
    }
    return null;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  flavors: string[] = [];
  filteredFlavors: Observable<string[]>;
  brands: string[] = [];
  brandFlavors = {};
  flavorIds = {};
  filteredBrands: Observable<string[]>;
  score: any;
  tableData: IceCream[];
  displayedColumns: string[] = ['rank', 'brand', 'flavor', 'avgRating'];

  private loggedIn: boolean;

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    private loginService: LoginStateService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getIceCream();
    this.populateAutoCompleteData();
    this.onValidationChanges();
    if (sessionStorage.getItem("user") != null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    this.loginService.getEmitter().subscribe((emit) => {
      if (emit == true) {
        this.loggedIn = true;
        console.log("home Component is notified of successfull login!");
      } else if (emit == false) {
        this.loggedIn = false;
        console.log("home Component is notified of successfull log-out!");
      }
    })
  }

  getIceCream(): void {
    this.dataService.getIceCream().subscribe((list: IceCream[]) => {
      this.tableData = list.sort((a, b) => b.avgRating - a.avgRating).slice(0,18).filter( elem => elem.avgRating >0 );
      list.forEach(element => {
        this.flavors.push(element.flavor);
        if (!(element.brand in this.brandFlavors)){
          this.brands.push(element.brand);
          this.flavorIds[element.flavor] = element.icecreamId;
          this.brandFlavors[element.brand] = new Array();
          this.brandFlavors[element.brand].push(element.flavor);
        } else {
          this.flavorIds[element.flavor] = element.icecreamId;
          this.brandFlavors[element.brand].push(element.flavor);
        }
      })
    })
  }

  populateAutoCompleteData() {
    this.ratingForm.get('brand').statusChanges.subscribe( status => {
      if(status=='VALID'){
        this.flavors = this.brandFlavors[this.ratingForm.get('brand').value];
      }
    });
    this.filteredFlavors = this.ratingForm.get('flavor').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.flavors))
    );
    this.filteredBrands = this.ratingForm.get('brand').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.brands))
    )
  }

  ratingForm = this.fb.group({
    brand: ['', [Validators.required, availableOptionsValid(this.brands)]],
    flavor: [{ value: '', disabled: true }, [Validators.required, availableOptionsValid(this.flavors)]],
    description: [{ value: '', disabled: true }],
    rating: this.fb.group({
      appearance: [1],
      aroma: [1],
      taste: [1],
      feel: [1],
      overall: [1]
    })
  });
  
  refreshComponent(){
    // this.router.navigate(['/']);
    this.router.navigateByUrl('/ratings', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
  }); 
  }

  ratingSubmit(): void {
    //TO DO: make sure this logged-in check works
    console.log(this.loggedIn)
    if (this.loggedIn == false) {
      console.log(this.ratingForm.get('brand').valid);
      this.openDialog();
    } else {
      let session = JSON.parse(sessionStorage.getItem('session'));
      console.log(session);
      console.log(this.flavorIds);
      console.log(this.ratingForm.value.flavor);
      let rating = new Rating(this.ratingForm.value.description,
                              this.score,
                              session.id,
                              this.flavorIds[this.ratingForm.value.flavor]);
      console.log(rating)
      this.dataService.addRating(rating).subscribe( respon => {
        console.log(respon);
        this.refreshComponent();
      },
      err => {
        console.log('error: '+err);
        alert('error in authenticating token');
      }
      );
    }

  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = this._normalizeValue(value);
    return options.filter(strAry => this._normalizeValue(strAry).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onValidationChanges(): void {
    this.ratingForm.get('brand').statusChanges.subscribe(status => {
      // console.log(status)
      if (status == 'VALID') {
        this.ratingForm.get('flavor').enable();
      } else if (status == 'INVALID') {
        this.ratingForm.get('flavor').disable();
      }
    });
    this.ratingForm.get('flavor').statusChanges.subscribe(status => {
      // console.log(status)
      if (status == 'VALID') {
        this.ratingForm.get('description').enable();
      } else if (status == 'INVALID') {
        this.ratingForm.get('description').disable();
      }
    })
    this.ratingForm.get('rating').valueChanges.subscribe(value => {
      // console.log(value)
      this.score = Object.values(this.ratingForm.get('rating').value).reduce((acc: number, cur: number) => acc + cur);
      // console.log(this.score)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '250px',
      data: { score: this.score }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


