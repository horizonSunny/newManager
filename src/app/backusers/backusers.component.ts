import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  // 脑健师
  hosNumber: any;
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
  doctorEntity:any={};
  // 医生数据
  doctorNumber:any;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }
  // 组建
  sortName: string | null = null;
  sortValue: string | null = null;
  // 状态
  listOfFilterAddress = [{ text: '正常', value: '正常' }, { text: '禁用', value: '禁用' }];
  // 性别
  listOfFilterSex = [{ text: '2', value: '2' }, { text: '0', value: '0' }];
  // 教育程度
  listOfFilterEducation = [{ text: '乌鲁木齐阿波罗医院', value: '乌鲁木齐阿波罗医院' }, { text: '仁济医院', value: '仁济医院' }, { text: '浦东妇幼', value: '浦东妇幼' }];
  listOfSearchAddress: string[] = [];
  listOfSearchSex: string[] = [];
  listOfSearchEducation: string[] = [];
  listOfSearchMedicine: string[] = [];
  listOfData: Array<{ userName: string; age: number; address: string; sex: string; mobilenumber: string; registerEmail: string; hospitals: string; doctorNumber: string; status: string; createTime: string; fullname: string;[key: string]: string | number }> = [this.hosNumber];
  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  // 排序事件
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }
  // 详情地址
  filterAddressChange(value: string[]): void {
    this.listOfSearchAddress = value;
    console.log(this.listOfSearchAddress, 'sddfdf');

    this.search();
  }
  // 性别
  filterSexChange(value: string[]): void {
    this.listOfSearchSex = value;
    console.log(this.listOfSearchSex, '2222');

    this.search();
  }
  // 教育程度
  filterEducationChange(value: string[]): void {
    this.listOfSearchEducation = value;
    console.log(this.listOfSearchEducation, '2222');

    this.search();
  }

  search(): void {
    const filterFunc = (item: { userName: string; age: number; address: string, sex: string; mobilenumber: string; registerEmail: string; hospitals: string; doctorNumber: string; status: string; createTime: string; fullname: string; }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
          : true) && item.userName.indexOf(this.searchValue) !== -1 &&
        (this.listOfSearchSex.length
          ? this.listOfSearchSex.some(sex => item.sex.indexOf(sex) !== -1)
          : true) && item.userName.indexOf(this.searchValue) !== -1 &&
        (this.listOfSearchEducation.length
          ? this.listOfSearchEducation.some(hospitals => item.hospitals.indexOf(hospitals) !== -1)
          : true) && item.userName.indexOf(this.searchValue) !== -1
        // (this.listOfSearchMedicine.length
        //   ? this.listOfSearchMedicine.some(medicine => item.medicine.indexOf(medicine) !== -1)
        //   : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.listOfData.filter((item: { userName: string; age: number; address: string, sex: string, mobilenumber: string, registerEmail: string; hospitals: string; doctorNumber: string; status: string; medicine: string; createTime: string; fullname: string; }) => filterFunc(item));
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
    );
  }

  // 测评列表
  healthyUser() {
    console.log('1111');
    this.router.navigate(['/backusers']);

  }
  // 下载模板
  downloadModal() {
    console.log('下载模板');
  }
  // 导入
  importModal() {
    console.log('导入');
  }
  // 导出
  exportModal() {
    console.log('导出');
    this.isVisible = true;

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
        doctorEntity:this.newDoctor,
        hospitals:this.newDoctor.hostileName
      }
      this.doctorNumber = doctoeUser;
      console.log(doctoeUser,'医生数据');
      this.healthyDivision.unshift(this.doctorNumber);
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.newVisible = false;
  }


  ngOnInit(): void {
    const condition = {
      'doctorSex': '',
      'doctorStatus': '',
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
}
