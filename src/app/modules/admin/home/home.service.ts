import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HomeModel } from './home.model';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private _data: BehaviorSubject<HomeModel> = new BehaviorSubject(null);
    private readonly baseUrl: string = environment.baseUrl;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */

    get data$(): Observable<HomeModel> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */

    postData(data: FormData) {
        console.log(data);
        const httpOptions = {
            headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
        }
        return this._httpClient.post<HomeModel>(this.baseUrl + '/api/chickens', data, httpOptions).pipe(
            catchError((error) => {
                return of(error);
            }),
            tap((response: HomeModel) => {
                console.log(response);
                this._data.next(response);
            })
        );
    }
}
