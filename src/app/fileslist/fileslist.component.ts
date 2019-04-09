import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fileslist',
  templateUrl: './fileslist.component.html',
  styleUrls: ['./fileslist.component.scss']
})
export class FileslistComponent implements OnInit {

  // 导出
  isVisible = false;
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  // 地址
  listOfFilterAddress = [{ text: '张', value: '张' }, { text: '李', value: '李' },{text: '王', value: '王'}];
  // 性别
  listOfFilterSex = [{ text: '男', value: '男' }, { text: '女', value: '女' }];
  // 教育程度
  listOfFilterEducation = [{text: '大学', value: '大学'},{text: '博士', value: '博士'},{text: '研究生', value: '研究生'}];
  // 痴呆药物
  listOfFilterMedicine = [{text: '美金刚', value: '美金刚'},{text: '叶酸', value: '叶酸'}];
  listOfSearchAddress: string[] = [];
  listOfSearchSex: string[] = [];
  listOfSearchEducation:string[] = [];
  listOfSearchMedicine:string[]=[];
  listOfData: Array<{ name: string; age: number; address: string;sex:string;phone:string;presentation:number;education:string;occupation:string;marriage:string;senile:string;medicine:string;recordTime:string;recordUsers:string;updateTime:string;[key: string]: string | number }> = [
    {
      name: '张三',
      age: 32,
      address: 'New York No. 1 Lake Park',
      sex:'男',
      phone:'17621320666',
      presentation:3,
      education:'大学',
      occupation:'工人',
      marriage:'未婚',
      senile:'晚期',
      medicine:'美金刚',
      recordTime:'2018.03.26',
      recordUsers:'王大伟',
      updateTime:'2018.6.6'
    },
    {
      name: '李四',
      age: 42,
      address: 'London No. 1 Lake Park',
      sex:'男',
      phone:'17621320666',
      presentation:3,
      education:'博士',
      occupation:'技术员',
      marriage:'未婚',
      senile:'早期',
      medicine:'叶酸',
      recordTime:'2018.03.25',
      recordUsers:'马佳佳',
      updateTime:'2018.6.7'
    },
    {
      name: '王五',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      sex:'女',
      phone:'17621320666',
      presentation:3,
      education:'研究生',
      occupation:'工人',
      marriage:'已婚',
      senile:'中期',
      medicine:'美金刚',
      recordTime:'2018.03.23',
      recordUsers:'张晓峰',
      updateTime:'2018.6.8'
    },
    {
      name: '张天才',
      age: 32,
      address: 'London No. 2 Lake Park',
      sex:'男',
      phone:'17621320666',
      presentation:3,
      education:'大学',
      occupation:'工人',
      marriage:'未婚',
      senile:'早期',
      medicine:'美金刚',
      recordTime:'2018.03.28',
      recordUsers:'王大海',
      updateTime:'2018.6.9'
    }
  ];
  listOfDisplayData = [...this.listOfData];
  constructor(
    private router: Router
  ) { }
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
    console.log(this.listOfSearchAddress,'sddfdf');
    
    this.search();
  }
  // 性别
  filterSexChange(value: string[]): void {
    this.listOfSearchSex = value;
    console.log(this.listOfSearchSex,'2222');
    
    this.search();
  }
  // 教育程度
  filterEducationChange(value: string[]): void {
    this.listOfSearchEducation = value;
    console.log(this.listOfSearchEducation,'2222');
    
    this.search();
  }
  // 老年痴呆药物
  filterMedicineChange(value: string[]): void {
    this.listOfSearchMedicine = value;
    console.log(this.listOfSearchMedicine,'2222');
    
    this.search();
  }

  search(): void {
    const filterFunc = (item: { name: string; age: number; address: string,sex:string;phone:string;presentation:number;education:string;occupation:string;marriage:string;senile:string;medicine:string;recordTime:string;recordUsers:string;updateTime:string;}) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
          : true) && item.name.indexOf(this.searchValue) !== -1&&
          (this.listOfSearchSex.length
            ? this.listOfSearchSex.some(sex => item.sex.indexOf(sex) !== -1)
            : true) && item.name.indexOf(this.searchValue) !== -1&&
            (this.listOfSearchEducation.length
              ? this.listOfSearchEducation.some(education => item.education.indexOf(education) !== -1)
              : true) && item.name.indexOf(this.searchValue) !== -1&&
              (this.listOfSearchMedicine.length
                ? this.listOfSearchMedicine.some(medicine => item.medicine.indexOf(medicine) !== -1)
                : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.listOfData.filter((item: { name: string; age: number; address: string,sex:string,phone:string,presentation:number; education:string;occupation:string;marriage:string;senile:string;medicine:string;recordTime:string;recordUsers:string;updateTime:string;}) => filterFunc(item));
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
  // 用户基本信息点击
  searchDetile() {
    this.router.navigate(['/presentation']);
  }
  // 导出--model
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

  ngOnInit(): void {
  }

}

