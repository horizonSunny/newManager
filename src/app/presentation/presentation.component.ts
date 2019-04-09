import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  // 用户姓名
  nameValue: string;
  // 性别选择
  sexValue = 'A';
  // 年龄
  ageValue:string;
  // 婚姻状况
  marriageValue = 'allMarried';
  // 手机号
  phoneValue : string;
  // 职业
  Occupation = 'allOccd';
  // 教育程度
  educationValue = 'primary';
  // 年数
  yearsValue = 'one';
  // 居住地
  residenceValue = 'city';
  // 身份证号
  idValue:string;
  // 用过的药物
  drugRadio = true;
  // 开始时间
  startTime:string;
  // 结束时间
  endTime:string;
  // 停药原因
  stopValue='nooBvious';
  // 是否有脑外伤
  NoYesValue = 'yes';
  // 是否有家族史
  familyValue = 'familyYes';
  // 是否停药
  stopYaoValue = 'yesYao';
  // 用户信息详情

  hideDetile:boolean = true;
  hideevaluation:boolean = false;

  // 顶部时间横轴设置
  tabs: any[] = [];
  nzTabPosition = 'top';
  selectedIndex = 0;

  // 查看详情模态框
  isVisible = false;


  constructor() { }

  // 基本信息点击
  basicData(){
    console.log('1111');
    this.hideDetile=true;
    this.hideevaluation=false;
  }
  // 测评报告点击
  presentText(){
    console.log('1111');
    this.hideevaluation=true;
    this.hideDetile=false;
  }

  log(args: any[]): void {
    console.log(args);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  ngOnInit(): void  {
    for (let i = 0; i < 20; i++) {
      this.tabs.push({
        name   : ` 02/25 12:2${i}`,
        content: `2019 ${i}`
      });
    }
  }

}
