import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  growersList: object;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  growersData: any;

  constructor(private http: HttpClient) {
    this.getGrowersData();
  }

  getGrowersData() {
    return new Promise(resolve => {
      this.http.get<myData>('http://localhost:3000/api/rewards/growers/claim').subscribe(
        data => {
          this.growersData = data;
          resolve(data);
          // console.log('growersData', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getRetailersData() {
    return new Promise(resolve => {
      this.http.get<myData>('http://localhost:3000/api/rewards/retailers/claim').subscribe(
        data => {
          resolve(data);
          // console.log('retailersData', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  growersValidate(info) {
    let data = {
      "status": info.newStatus
    };
    console.log(info);
    console.log(data);
    return new Promise(resolve => {
      this.http.patch('http://localhost:3000/api/rewards/growers/claim/' + info.id + '', data).subscribe(
        data => {
          resolve(data);
          console.log('res', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  retailersValidate(info) {
    let data = {
      status: info
    };
    return new Promise(resolve => {
      this.http.patch('http://localhost:3000/api/rewards/retailers/claim', data).subscribe(
        data => {
          resolve(data);
          console.log('res', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
