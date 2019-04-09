import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { HttpService } from "../tools/http/httpService";
import { HttpClient } from "@angular/common/http";
//导出Excel
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";

@Component({
  selector: "app-fileslist",
  templateUrl: "./fileslist.component.html",
  styleUrls: ["./fileslist.component.scss"]
})
export class FileslistComponent implements OnInit {
  // select的选项信息
  sex: any = -1;
  age: any = '';
  education: any = '';
  definiteCase: any = -1;
  pharmacy: any = '';
  patientNameSelected: any = '';
  sortKey: any = '';
  orderBy: any = null;
  selectedOptions = {
    sex: [{ text: '男', value: 0 }, { text: '女', value: 1 }, { text: '不限', value: -1 }],
    age: [{ text: '小于60', value: '0-59' }, { text: '60-64', value: '60-64' }, { text: '65-69', value: '65-69' },
    { text: '70-74', value: '70-74' }, { text: '大于74', value: '75-300' }, { text: '不限', value: '' }],
    education: [{ text: '小于7', value: '0-6' }, { text: '7-9', value: '7-9' }, { text: '10-12', value: '10-12' },
    { text: '13-16', value: '13-16' }, { text: '大于16', value: '17-300' }, { text: '不限', value: '' }],
    definiteCase: [{ text: 'MCI', value: 1}, { text: '早期', value: 2 }, { text: '中期', value: 3 },
    { text: '晚期', value: 4 }, { text: '其他', value: 5 }, { text: '否', value: 0 }, { text: '不限', value: -1 }],
    pharmacy: [{ text: '多奈哌齐', value: '多奈哌齐' }, { text: '美金刚', value: '美金刚' }, { text: '卡巴拉汀', value: '卡巴拉汀' },
      { text: '石杉碱甲', value: '石杉碱甲' }, { text: '奥拉西坦', value: '奥拉西坦' },
      { text: '维生素B', value: '维生素B' }, { text: '叶酸', value: '叶酸' },
      { text: '银杏叶产品', value: '银杏叶产品' }, { text: '其它', value: '其它' },
      { text: '否', value: '否' }, { text: '不限', value: '' },
    ],

  };
  // 选中问题
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  listOfAllData = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;
  // 页面设置
  pageSize = 5;
  pageTotal = 0;
  pageIndex = 1;
  // 导出
  isVisible = false;

  constructor(private router: Router, private http: HttpClient) {}
  // 用户基本信息点击
  goToDetails(info) {

    console.log("user_detail_", info);
    const detailInfo = JSON.stringify(info);
    this.router.navigate(["/presentation"], {
      queryParams: { patientInfo: detailInfo }
    });

    // this.router.navigate(["/presentation"], {
    //   queryParams: { patientInfo: info }
    // });
  }
  // 导出--model
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  keyUpEnter(event) {
    if (event.which === 13) {
     this.getData();
    }
  }
  // 导出excel 文件
  // exportModal() {
  //   console.log(this.doctorList, '导出');
  //   if (this.doctorList == []) {
  //     this.isVisible = true;
  //   } else {
  //     let nameList;
  //     const params = {
  //       doctorIds: [this.checkDoctor]
  //     };
  //     console.log(params, '导出--确定');
  //     this.http.post('http://192.168.5.185:8080/brainPlatform/rest/backend/exportDoctors', params,
  //       { headers: { token: localStorage.getItem('token') }, responseType: 'blob' }).subscribe((data: any) => {
  //         console.log(data, '导出数据');
  //         var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  //         var objectUrl = URL.createObjectURL(blob);
  //         window.open(objectUrl);
  //       });
  //   }
  // }
  // 过滤选项数据，赋值this
  filter(listOfSearchName: string, searchAddress: string) {
    this[listOfSearchName] = searchAddress;
    // this.searchAddress = searchAddress;
    // this.search();
    this.getData();
    console.log('this[listOfSearchName]_', this[listOfSearchName]);

  }
  // 选中的函数
  currentPageDataChange($event): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
    console.log('this.mapOfCheckedId_', this.mapOfCheckedId);
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }
  stopPropagation($event: Event) {
    $event.stopPropagation();
  }
// 排序
sort(event) {
  this.sortKey = event.key;
  switch (event.value) {
    case null:
      this.orderBy = '';
      break;
    case 'descend':
      this.orderBy  = 'DESC';
      break;
    case 'ascend':
      this.orderBy  = 'ASC';
      break;
  }
  this.getData();
}
pageIndexChange(event) {
  console.log('pageIndexChange_', event);
  console.log('pageIndexChange_page_', this.pageIndex);
  this.pageIndex = event;
  this.getData();
}
// 发送http请求
getData() {
    const params = {
      educationTime: this.education,
      medicalHistory: this.definiteCase,
      medicationName: this.pharmacy,
      orderBy: this.orderBy,
      pageNumber: this.pageIndex - 1,
      pageSize: this.pageSize,
      patientAge: this.age,
      patientName: this.patientNameSelected,
      patientSex: this.sex,
      sortKey: this.sortKey
    };
    this.http
    .post(
      "http://192.168.5.185:8081/rest/backend/patients",
      params,
      {
        headers: { Token: localStorage.getItem("token") }
      }
    )
    .subscribe((res: any) => {
      this.pageIndex = res.body.pageNumber + 1;
      this.pageTotal = res.body.totalElements;
      console.log('pageTotal_', this.pageTotal);
      const list = [];
      for (let i = 0; i < res.body.patients.length; i++) {
        list.push({id: i, info: res.body.patients[i]});
      }
      this.listOfAllData = list;
      console.log('this.listOfAllData_', this.listOfAllData);
      // this.listOfDisplayData = res.body;
      // console.log("this.listOfDisplayData_", this.listOfDisplayData);
    });
  }
  ngOnInit(): void {
    this.getData();
  }
}
