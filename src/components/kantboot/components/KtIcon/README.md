# 使用方式
```html
<kt-icon 
        :icon="iconName" 
        :size="size"
        :color="color"
></kt-icon>
```
# 参数
| 参数    | 说明 | 类型            | 可选值 | 默认值 |
|:------| :--- |:--------------| :--- | :--- |
| icon  | 图标名称 | String        | - | - |
| size  | 图标大小 | String、Number | - | - |
| color | 图标颜色 | String        | - | - |

# 图标名称
## element-plus的图标，加上`el-icon-`前缀
示例：
```html
<kt-icon icon="el-icon-edit"></kt-icon>
```
## ant-design-vue的图标，加上`ant-icon-`前缀
示例：
```html
<kt-icon icon="ant-icon-edit"></kt-icon>
```