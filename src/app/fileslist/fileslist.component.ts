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
  sexSelected: any;
  ageSelected: any;
  educationSelected: any;
  medicalHistorySelected: any;
  medicationNameSelected: any;
  patientNameSelected: any;
  selectedOptions = {
    sex: [{ text: '男', value: 0 }, { text: '女', value: 1 }, { text: '不限', value: -1 }],
    
    age: [{ text: '小于60', value: '0-59' }, { text: '60-64', value: '60-64' }, { text: '65-69', value: '65-69' },
    { text: '70-74', value: '70-74' }, { text: '大于74', value: '75-300' }, { text: '不限', value: '' }],
    
    eduction: [{ text: '小于7', value: '0-6' }, { text: '7-9', value: '7-9' }, { text: '10-12', value: '10-12' },
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
  listOfDisplayData = [];
  // 导出
  isVisible = false;

  constructor(private router: Router, private http: HttpClient) {}
  // 用户基本信息点击
  goToDetails(info) {
    console.log("---------");

    console.log("user_detail_", info);
    const detailInfo = JSON.stringify(info);
    this.router.navigate(["/presentation"], {
      queryParams: { patientInfo: detailInfo },
      skipLocationChange: true
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
  // 导出excel 文件

  // exportList() {
  //   let nameList;
  //   const params = {
  //     patientIds: [6]
  //   };
  //   this.http
  //     .post(
  //       "http://138.197.212.45:8081/brainPlatform/rest/backend/exportPatients",
  //       params,
  //       {
  //         headers: { token: localStorage.getItem("token") }
  //       }
  //     )
  //     .subscribe((res: any) => {
  //       // this.listOfDisplayData = res.body;
  //       nameList = res;
  //       console.log("this.listOfDisplayData_", this.listOfDisplayData);
  //     });

  //   let json = nameList;
  //   //这个nameList (随便起的名字)，是要导出的json数据
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = {
  //     Sheets: { data: worksheet },
  //     SheetNames: ["data"]
  //   };
  //   const excelBuffer: any = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array"
  //   });
  //   //这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
  //   this.saveAsExcelFile(excelBuffer, "nameList");
  // }

  // private saveAsExcelFile(buffer: any, fileName: string) {
  //   const data: Blob = new Blob([buffer], {
  //     type:
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  //   });
  //   FileSaver.saveAs(data, fileName + "_" + new Date().getTime() + ".xls");
  //   // 如果写成.xlsx,可能不能打开下载的文件，这可能与Excel版本有关
  // }
  filter(listOfSearchName: string, searchAddress: string) {
    // this.listOfSearchName = listOfSearchName;
    // this.searchAddress = searchAddress;
    // this.search();
    console.log('name_', listOfSearchName);
    console.log('listOfSearchName_', searchAddress);
  }
  ngOnInit(): void {
    const params = {
      educationTime: "",
      medicalHistory: -1,
      medicationName: "",
      orderBy: "",
      pageNumber: 0,
      pageSize: 10,
      patientAge: "",
      patientName: "",
      patientSex: -1,
      sortKey: ""
    };

    this.http
      .post(
        "http://192.168.5.185:8080/brainPlatform/rest/backend/patients",
        params,
        {
          headers: { Token: localStorage.getItem("token") }
        }
      )
      .subscribe((res: any) => {
        this.listOfDisplayData = res.body;
        console.log("this.listOfDisplayData_", this.listOfDisplayData);
      });
  }
}
