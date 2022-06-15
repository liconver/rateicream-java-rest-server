import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IceCream } from '../types/IceCream';
import { Rating } from '../types/Rating';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getIceCream(): Observable<IceCream[]>{
    return this.http.get<IceCream[]>('/api/geticecream');
  }

  getTopIceCream(): Observable<IceCream[]>{
    return this.http.get<IceCream[]>('/api/topicecream');
  }

  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>('/api/addrating', rating);
  } 
}
