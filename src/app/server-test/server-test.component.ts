import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataHelperModule } from '../providers/data-helper.module';

@Component({
  selector: 'app-server-test',
  templateUrl: './server-test.component.html',
  styleUrls: ['./server-test.component.scss']
})
export class ServerTestComponent implements OnInit {

  public dim: number;
  public in: string;
  public out: string = "";

  constructor(
    private http: HttpClient,
    private helper: DataHelperModule) { }

  ngOnInit(): void {
    this.in = 'lc = 0.3;\n'
    this.in += 'Point(1) = {0.0,0.0,0.0,lc};\n'
    this.in += 'Point(2) = {1,0.0,0.0,lc};\n'
    this.in += 'Point(3) = {1,1,0.0,lc};\n'
    this.in += 'Point(4) = {0,1,0.0,lc};\n'
    this.in += 'Line(1) = {4,3};\n'
    this.in += 'Line(2) = {3,2};\n'
    this.in += 'Line(3) = {2,1};\n'
    this.in += 'Line(4) = {1,4};\n'
    this.in += 'Line Loop(5) = {2,3,4,1};\n'
    this.in += 'Plane Surface(6) = {5};\n'
    this.in += 'tmp[] = Extrude {0,0.0,1} {\n'
    this.in += '  Surface{6};\n'
    this.in += '};\n'
    this.in += 'Physical Volume(1) = tmp[1];\n'
  }

  onClickMe() {

    const url = 'https://uij0y12e2l.execute-api.ap-northeast-1.amazonaws.com/default/gmsh';

    let d: number = this.helper.toNumber(this.dim);
    if(d === null){
      d = 3;
    }
    let geo: string = this.in;
    if(geo === undefined){
      alert('入力ファイル(.geo) に入力してください');
      return;
    } 

    const json = JSON.stringify({
      dim: d,
      geo: geo.trim()
  });
    
    this.http.post(url, json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }).subscribe(
      response => {
        // 通信成功時の処理（成功コールバック）
        console.log('通信成功!!');
        const jsonData = JSON.parse(response);
        this.out = jsonData['msh'];
      },
      error => {

        let messege: string = '通信 ' + error.statusText;
        if ('_body' in error) {
          messege += '\n' + error._body;
        }
        alert(messege);
        console.error(error);
      }
    );
  }


}
