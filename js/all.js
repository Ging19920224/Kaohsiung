const showData = document.querySelector('.show-data');
const page = document.querySelector('.page-container');
const areaTitle = document.querySelector('.area-title');
const areaList = document.querySelector('.area-list');
const areaSelect = document.querySelector('.area-select');
const topBtn = document.querySelector('.topBtn');
const pageBtn = document.querySelector('.page');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
let index = 1; //設定目前頁數 預設第1頁
let area = '三民區'; //設定顯示資料行政區 預設為三民區
let xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload = function(msg) {
  loadData(area);
  getArea();
}

//設定監聽
pageBtn.addEventListener('click',pageBtnActive);
topBtn.addEventListener('click',scroll);
areaSelect.addEventListener('change',areaChange);
areaList.addEventListener('click',function(e){
  if(e.target.nodeName == 'LI'){
    area = e.target.innerHTML;
    reset();
    loadData(area);
  }
});


function loadData(area) {
  setShowDataNum(index);
  areaTitle.textContent = area;
  let msg = JSON.parse(xhr.responseText);
  let dataLength = msg.result.records.length;
  let dataNum = 0;  //設定符合的資料總筆數
  for (let i = 0;i < dataLength;i++) {
    if (msg.result.records[i].Zone == area) {
      if (dataNum >= indexStr && dataNum <= indexEnd) {  //依索引範圍產生對應的DOM
        //設定欲產生的DOM
        const data = document.createElement('div');
        data.setAttribute('class','data');
        data.setAttribute('id','data-'+i);
        const dataImg = document.createElement('div');
        dataImg.setAttribute('class','data-img');
        dataImg.setAttribute('id','dataImg-'+i);
        const img = document.createElement('img');
        img.setAttribute('src',msg.result.records[i].Picture1)
        const dataTitle = document.createElement('div');
        dataTitle.setAttribute('class','data-title');
        dataTitle.setAttribute('id','dataTitle-'+i);
        const titleName = document.createElement('span');
        titleName.setAttribute('class','title-name');
        titleName.textContent = msg.result.records[i].Name;
        const titleArea = document.createElement('span');
        titleArea.setAttribute('class','title-area');
        titleArea.textContent = msg.result.records[i].Zone;
        const dataTime = document.createElement('p');
        dataTime.setAttribute('class','data-info');
        dataTime.setAttribute('id','dataTime-'+i);
        const timeIcon = document.createElement('span');
        timeIcon.setAttribute('class','icon');
        timeIcon.setAttribute('id','timeIcon-'+i);
        const timeImg = document.createElement('img');
        timeImg.setAttribute('src','./images/icons_clock.png');
        const timeA = document.createElement('a');
        timeA.setAttribute('title',msg.result.records[i].Opentime);
        timeA.setAttribute('id','timeA-'+i);
        const timeInfo = document.createElement('span');
        timeInfo.setAttribute('class','info');
        timeInfo.textContent = msg.result.records[i].Opentime;
        const dataAddr = document.createElement('p');
        dataAddr.setAttribute('class','data-info');
        dataAddr.setAttribute('id','dataAddr-'+i);
        const addrIcon = document.createElement('span');
        addrIcon.setAttribute('class','icon');
        addrIcon.setAttribute('id','addrIcon-'+i);
        const addrImg = document.createElement('img');
        addrImg.setAttribute('src','./images/icons_pin.png');
        const addrA = document.createElement('a');
        addrA.setAttribute('title',msg.result.records[i].Add);
        addrA.setAttribute('id','addrA-'+i);
        const addrInfo = document.createElement('span');
        addrInfo.setAttribute('class','info');
        addrInfo.textContent = msg.result.records[i].Add;
        const dataPhone = document.createElement('p');
        dataPhone.setAttribute('class','data-info');
        dataPhone.setAttribute('id','dataPhone-'+i);
        const phoneIcon = document.createElement('span');
        phoneIcon.setAttribute('class','icon');
        phoneIcon.setAttribute('id','phoneIcon-'+i);
        const phoneImg = document.createElement('img');
        phoneImg.setAttribute('src','./images/icons_phone.png');
        const phoneInfo = document.createElement('span');
        phoneInfo.setAttribute('class','info-phone');
        phoneInfo.textContent = msg.result.records[i].Tel;
        const free = document.createElement('span');
        free.setAttribute('class','free');
        free.setAttribute('id','free-'+i);
        const freeIcon = document.createElement('img');
        freeIcon.setAttribute('src','./images/icons_tag.png');
        const freeInfo = document.createElement('span');
        freeInfo.textContent = msg.result.records[i].Ticketinfo;

        //執行產生DOM
        showData.appendChild(data);
        document.querySelector('#data-'+i).appendChild(dataImg);
        document.querySelector('#dataImg-'+i).appendChild(dataTitle);
        document.querySelector('#dataImg-'+i).appendChild(img);
        document.querySelector('#dataTitle-'+i).appendChild(titleName);
        document.querySelector('#dataTitle-'+i).appendChild(titleArea);
        document.querySelector('#data-'+i).appendChild(dataTime);
        document.querySelector('#dataTime-'+i).appendChild(timeIcon);
        document.querySelector('#timeIcon-'+i).appendChild(timeImg);
        document.querySelector('#dataTime-'+i).appendChild(timeA);
        document.querySelector('#timeA-'+i).appendChild(timeInfo);
        document.querySelector('#data-'+i).appendChild(dataAddr);
        document.querySelector('#dataAddr-'+i).appendChild(addrIcon);
        document.querySelector('#addrIcon-'+i).appendChild(addrImg);
        document.querySelector('#dataAddr-'+i).appendChild(addrA);
        document.querySelector('#addrA-'+i).appendChild(addrInfo);
        document.querySelector('#data-'+i).appendChild(dataPhone);
        document.querySelector('#dataPhone-'+i).appendChild(phoneIcon);
        document.querySelector('#phoneIcon-'+i).appendChild(phoneImg);
        document.querySelector('#dataPhone-'+i).appendChild(phoneInfo);
        document.querySelector('#dataPhone-'+i).appendChild(free);
        document.querySelector('#free-'+i).appendChild(freeIcon);
        document.querySelector('#free-'+i).appendChild(freeInfo);
      }
      dataNum += 1; //當符合資料條件時 資料總筆數就+1
    }
  }
    appendPage(dataNum)  //依照取得的資料總比數 產生出應有的頁數按鈕
}
function getArea() {
let data = [];
  let msg = JSON.parse(xhr.responseText);
  let dataLength = msg.result.records.length;
  for (let i = 0;i < dataLength;i++) {
    data.push(msg.result.records[i].Zone);
  }
  let areaName = [];
  data.forEach(function(value) {
    if(areaName.indexOf(value) == -1){
      areaName.push(value);
    }
  });
  let areaNameLength = areaName.length;
  for (let i = 0;i <areaNameLength;i++) {
    let option = document.createElement('option');
    option.setAttribute('value',areaName[i]);
    option.textContent = areaName[i];
    areaSelect.appendChild(option);
  }
}
function setShowDataNum(index) {
  indexStr = (index * 8) - 8; //設定資料起始索引數 每頁8筆
  indexEnd = (index * 8) - 1; //設定資料結束索引數
}
function appendPage(dataNum) {  //產生頁數按鈕
  let getPage = dataNum/8;
  let pageRe = dataNum%8;
  if(pageRe > 0){
    pageTotal = parseInt(getPage) + 1;
  }else{
    pageTotal = parseInt(getPage);
  }
  for(let i = 1;i <= pageTotal;i++){
    const pageNum = document.createElement('a');
    pageNum.setAttribute('class','page-num');
    pageNum.setAttribute('href','javascript:;');
    if(index == i){  //若目前頁數等於i 則將該i生成的頁數按鈕變為藍色
      pageNum.classList.add('page-num-disabled');
    }
    pageNum.addEventListener('click',function(e) {  //對頁數按鈕下監聽
      index = e.target.innerHTML;
      pageChange(index);
    });
    pageNum.textContent = i;
    page.appendChild(pageNum);
  }
  btnColorChange();
}
function nextPage() {
  index = Number(index);
  index += 1;
  pageChange(index);
}
function prevPage() {
  index = Number(index);
  index -= 1;
  pageChange(index);
}
function pageChange(index) {
  setShowDataNum(index);
  showData.innerHTML = '';
  page.innerHTML = '';
  btnColorChange();
  loadData(area);
}
function btnColorChange() {
  if(index == 1 && index == pageTotal){
    prevBtn.classList.add('btn-disabled');
    nextBtn.classList.add('btn-disabled');
  }else if(index == 1 && index != pageTotal){
    prevBtn.classList.add('btn-disabled');
    nextBtn.classList.remove('btn-disabled');
  }else if(index != 1 && index == pageTotal){
    nextBtn.classList.add('btn-disabled');
    prevBtn.classList.remove('btn-disabled');
  }
}
function areaChange() {
  area = areaSelect.value;
  reset();
  loadData(area);
}
function reset() {
  showData.innerHTML = '';
  page.innerHTML = '';
  index = 1;
}
function scroll() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function pageBtnActive(e) {
  switch (true) {
    case index == 1 && index == pageTotal :
      btnColorChange();
      if (e.target.id == 'next' || e.target.id == 'prev')  return;
    case index == 1 && index != pageTotal :
      btnColorChange();
      if (e.target.id == 'next') { nextPage(); } else if (e.target.id == 'prev')  return;
    case index != 1 && index == pageTotal :
      btnColorChange();
      if (e.target.id == 'prev') { prevPage(); } else if (e.target.id == 'next') return;
  }
}