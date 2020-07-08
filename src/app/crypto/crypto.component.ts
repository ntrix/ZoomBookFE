import { CryptoService } from '../home/services/crypto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  hidden = false;
  datas = [];
  unitSymbol: string = 'USD';

  constructor(private _http: CryptoService) {}

  ngOnInit() {
    this._http.getBeer().subscribe((data) => {
      let maxSymbol = 9;
      Object.values(data).forEach((obj) => {
        if (maxSymbol && obj[0].slice(4, 7) == this.unitSymbol) {
          obj[8] = ~~obj[8];
          this.datas.push(obj);
          maxSymbol--;
        }
      });
      if (this.datas) this.hidden = true;
    });
  }

  vol(arg) {
    return (arg[7] * arg[8]) | 0; //return price*volume = volume in USD
  }
}
