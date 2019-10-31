# Westar Client

## Todo
- [x] AppProvider Sharing App state to other Components.
- [x] Apollo hooks LoggedIn Component sharing Query/Mutation.
- [ ] Photo Image Upload.


## Result
- [x] 0. 전체 페이지에서 공통적으로 사용될것은 AppProvider에서 제공된다.
- [-] 하나의 페이지를 AppComponent의 아래로 두어 관리한다. =>  이 페이지에서만 사용될 독립적인 Query/Mutation은 하나의 Provider에서 context를 리턴받아서 사용할 수 있도록 한다.
> > 2. 아직은 AppProvider와 SignUpProvider를 적용시키고있으며, Login과 Navigation도 수정될것이다.



## Install
1. yarn add react-dropzone @types/react-dropzone
> * https://github.com/react-dropzone/react-dropzone
- yarn add apollo-link-http apollo-client apollo-link

2. yarn add apollo-upload-client @types/apollo-upload-client 
: 사용안함.

3. yarn add axios