## 请求的方式
### 示例
```js
$kt.request.request({
  url: "/system-dict-web/dictI18n/getDictI18nMapSelf",
  method: "post",
  params: {
    dictGroupCode: "appFront",
  },
  stateSuccess: (res: any) => {
  },
  stateFail: (res: any) => {
    console.log("请求失败", res);
  }
})
```