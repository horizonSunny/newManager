import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//导出Excel
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-backusers',
  templateUrl: './backusers.component.html',
  styleUrls: ['./backusers.component.scss']
})
export class BackusersComponent implements OnInit {
  // 导出
  isVisible = false;
  // 新建
  newVisible = false;
  searchValue = '';
  // 脑健师
  healthyDivision: any;
  selectedValue: any;
  // // 脑健师
  // hosNumber: any;
  // 城市
  options: any;
  nzOptions: any;
  // 医院
  values: any[] | null = null;
  hospitalName: any;
  // 医院名称
  hostileName: any;
  // 出生日期
  // dateFormat = 'yyyy-MM-dd';
  dateTime: any;
  // 姓名
  nameValue: any;
  // 所属医院
  // hostileValue:any;
  // 身份证号
  idValue: any;

  sex: any;
  status: any;
  // 手机号
  phoneValue: any;
  // 邮箱号
  emileValue: any;
  // 性别
  sexValue: any;
  // 职业经历
  workValue: any;
  // 新增医生
  newDoctor: any;
  doctorEntity: any = {};
  // 医生数据
  doctorNumber: any;
  // 选框用户
  checkUser: any = [];
  // 选框医生uid
  checkDoctor: any;
  // 导出
  nameList: any;
  // 医生选框
  doctorList: any;
  // 上传文件
  filename:any;
  display:boolean;

  token:string = localStorage.getItem('token')
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }
  // 组建
  sortName: string | null = null;
  sortValue: string | null = null;
  // 状态
  listOfFilterAddress = [{ text: '全部', value: '-1' }, { text: '账户已删除', value: '0' }, { text: '正常状态', value: '1' }, { text: '禁用状态', value: '2' }];
  // 性别
  listOfFilterSex = [{ text: '女', value: '1' }, { text: '男', value: '0' }, { text: '全部', value: '-1' }];
  // 教育程度
  // listOfFilterEducation = [{ text: '乌鲁木齐阿波罗医院', value: '乌鲁木齐阿波罗医院' }, { text: '仁济医院', value: '仁济医院' }, { text: '浦东妇幼', value: '浦东妇幼' }];
  listOfSearchAddress: string[] = [];
  listOfSearchSex: string[] = [];
  listOfSearchEducation: string[] = [];
  listOfSearchMedicine: string[] = [];
  listOfData: Array<{ filter: string }> = [this.healthyDivision];
  listOfDisplayData = [...this.listOfData];
  // reset(): void {
  //   this.searchValue = '';
  //   this.search();
  // }
  // 排序事件
  // sort(sort: { key: string; value: string }): void {
  //   this.sortName = sort.key;
  //   this.sortValue = sort.value;
  //   this.search();
  // }
  // // 详情地址
  // filterAddressChange(value: string): void {
  //   console.log('filterAddressChange_',value);
  //   // this.listOfSearchAddress = value;
  //   // console.log(this.listOfSearchAddress, 'sddfdf');

  //   this.search();
  // }
  // 性别
  // filterSexChange(value: string[]): void {
  //   this.listOfSearchSex = value;
  //   console.log(this.listOfSearchSex, '2222');

  //   this.search();
  // }
  // // 教育程度
  // filterEducationChange(value: string[]): void {
  //   this.listOfSearchEducation = value;
  //   console.log(this.listOfSearchEducation, '2222');

  //   this.search();
  // }
  // select筛选
  selectFilter(selectName, selectValue: string) {
    console.log('selectName_', selectName, '_selectValue_', selectValue);
    this[selectName] = selectValue;
    console.log('this.sex_', this.sex);
    console.log('this.status_', this.status);
    this.getdoctorList();
  }

  // search(): void {
  //   const filterFunc = (item: { filter:string }) => {
  // return (
  //   (this.listOfSearchAddress.length
  //     ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
  //     : true) && item.userName.indexOf(this.searchValue) !== -1 &&
  //   (this.listOfSearchSex.length
  //     ? this.listOfSearchSex.some(sex => item.sex.indexOf(sex) !== -1)
  //     : true) && item.userName.indexOf(this.searchValue) !== -1 &&
  //   (this.listOfSearchEducation.length
  //     ? this.listOfSearchEducation.some(hospitals => item.hospitals.indexOf(hospitals) !== -1)
  //     : true) && item.userName.indexOf(this.searchValue) !== -1
  // );
  // };
  // const data = this.listOfData.filter((item: { filter:string }) => filterFunc(item));
  // this.listOfDisplayData = data.sort((a, b) =>
  //   this.sortValue === 'ascend'
  //     ? a[this.sortName!] > b[this.sortName!]
  //       ? 1
  //       : -1
  //     : b[this.sortName!] > a[this.sortName!]
  //       ? 1
  //       : -1
  // );
  // }

  // 测评列表
  healthyUser() {
    console.log('1111');
    this.router.navigate(['/backusers']);

  }
  // 接受选框的值
  // doctorList = [];
  // 选框--选中
  mapOfCheckedId(valueCheck, info): void {
    // console.log(valueCheck, '选框--选中',info);
    this.checkDoctor = valueCheck;
    this.doctorList = [];
    this.healthyDivision.map(data => {
      console.log(data.doctorEntity, '选框');
      if (data.checked === true) {
        console.log(data.checked, 'fuxuankuang');
        this.doctorList.push(data.doctorEntity)
      }
    });
    console.log("返回true", this.doctorList);
  }
  // 下载模板
  downloadModal() {
    console.log('下载模板');
    window.location.href = 'http://192.168.5.176:8081/脑健康管理师档案信息（导入模板）.xls';
  }
  // 导入
  public uploader:FileUploader = new FileUploader({    
    url: "http://192.168.5.185:8080/brainPlatform/rest/backend/importDoctors"+'?status=1',
    method: "POST",    
    itemAlias: "uploadedfile",
    headers:[
      {name:"token",value:this.token}
    ]
  });
  
selectedFileOnChanged() {
  // 这里是文件选择完成后的操作处理
  console.log('1111')
  this.uploader.queue[0].onSuccess = (response, status, headers) => { 
      console.log(this.uploader,'http地址');
      console.log(response,'response');
      console.log(status,'status');
      console.log(status,'headers');
      // 上传文件成功   
      if (status === 200) {
          alert('上传文件成功');
          // 上传文件后获取服务器返回的数据 
          // const tempRes = JSON.parse(response);
      }else {            
          // 上传文件后获取服务器返回的数据错误
          alert('上传错误')        
      }
    };
    this.uploader.queue[0].upload();
}

  // 导出
  exportModal() {
    console.log(this.doctorList, '导出');
    if (this.doctorList == []) {
      this.isVisible = true;
    } else {
      let nameList;
      const params = {
        doctorIds: [this.checkDoctor]
      };
      console.log(params, '导出--确定');
      this.http.post('http://192.168.5.185:8080/brainPlatform/rest/backend/exportDoctors', params,
        { headers: { token: localStorage.getItem('token') }, responseType: 'blob' }).subscribe((data: any) => {
          console.log(data, '导出数据');
          var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          var objectUrl = URL.createObjectURL(blob);
          window.open(objectUrl);
          // var objectUrl = URL.createObjectURL(blob);  
          // var a = document.createElement('a');
          // document.body.appendChild(a);
          // a.setAttribute('style', 'display:none');
          // a.setAttribute('href', objectUrl);
          // a.setAttribute('download', fileName);
          // a.click();
          // URL.revokeObjectURL(objectUrl);
        });
    }
  }
  // 导出--确定
  patientOk() {
    this.isVisible = false;
  }
  // 新建
  showModal(): void {
    this.newVisible = true;
    // 获取城市
    this.http.get('http://192.168.5.185:8080/brainPlatform/rest/backend/city/query', { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      this.options = data.body;
      console.log(this.options, '城市');
      setTimeout(() => {
        this.nzOptions = this.options;
      }, 100);
    });
  }
  // 模态框--城市
  onChanges(value: any): void {
    console.log(value, this.values, '城市名称');
    let hostile = this.nzOptions;
    console.log(hostile, '城市');
    const uidList = value[1];
    console.log(uidList, '最后')
    this.http.get('http://192.168.5.185:8080/brainPlatform/rest/backend/city/hospital/query' + '?' + 'uid=' + uidList, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      // console.log(data.body, '医院')
      this.hospitalName = data.body;
      console.log(this.hospitalName, '医院')
    });
  }
  // 模态框--医院
  hostileChanges(value: any): void {
    console.log(value, '医院名称');
    this.hostileName = value;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.newVisible = false;
    const createDoctor = {
      // 出生日期
      'birthDate': this.dateTime,
      // 姓名
      'fullname': this.nameValue,
      // 所属医院
      'hospitals': [this.hostileName],
      // 身份证号
      'idnumber': this.idValue,
      // 手机号
      'mobilenumber': this.phoneValue,
      // 邮箱
      'registerEmail': this.emileValue,
      // 性别
      'sex': this.sexValue,
      // 职业经历
      'workePerience': this.workValue,
    }
    console.log(createDoctor, '新增医生');
    this.http.post('http://192.168.5.185:8080/brainPlatform/rest/backend/insertDoctor', createDoctor, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      console.log(data, '发送新建测评方案');
      this.newDoctor = data.body;
      // console.log(this.newDoctor,'医生数据');
      const doctoeUser = {
        doctorEntity: this.newDoctor,
        hospitals: this.newDoctor.hostileName
      }
      this.doctorNumber = doctoeUser;
      console.log(doctoeUser, '医生数据');
      this.healthyDivision.unshift(this.doctorNumber);
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.newVisible = false;
  }

  // 重置密码
  resetPass(uid){
    console.log(uid, '重置密码');
    const url ='http://192.168.5.185:8080/brainPlatform/rest/backend/resetPassword?uid='+uid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token':  localStorage.getItem('token') 
      })
    };
    console.log(httpOptions,'httpOptions');
    this.http.post(url,{},httpOptions).subscribe((data: any) => {
      console.log(data, '重置密码');
    });
  }
  // 禁用
  prohibit(uid){
    console.log(uid, '禁用');
    const url ='http://192.168.5.185:8080/brainPlatform/rest/backend/resetPassword?uid='+uid+'&';
  }
  // 获取医生用户列表
  getdoctorList() {
    const condition = {
      'doctorSex': this.sex,
      'doctorStatus': this.status,
      'fullname': '',
      'hospitalId': '',
      'orderBy': '',
      "pageNumber": 1,
      "pageSize": 10,
      "sortKeyWord": ''
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    console.log(httpOptions, '1111')
    this.http.post('http://192.168.5.185:8080/brainPlatform/rest/backend/queryDoctors', condition, httpOptions).subscribe((data: any) => {
      const healthyList = data.body;
      this.healthyDivision = healthyList;
      console.log(this.healthyDivision, '脑健师');
    });
  }

  ngOnInit(): void {
    this.getdoctorList();
  }
}
