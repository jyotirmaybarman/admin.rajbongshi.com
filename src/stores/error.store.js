import { defineStore } from 'pinia'
    
export const useErrorStore = defineStore({
  id: 'error-store',
  
  state: () => ({
    title: "error title",
    subtitle: "error subtitle",
    errorCode: 400,
    show: false
  }),
  
  getters: {
    getData(){
        return {
            title: this.title,
            subtitle: this.subtitle,
            errorCode: this.errorCode,
            show: this.show
        }
    }
  },
  
  actions: {
    handle(error, title=null, subtitle=null){
      console.log("In error handler");
      console.log(error);

      let generated = generateDefaultErrorData(error);
      this.errorCode = generated.errorCode;
      this.title = generated.title;
      this.subtitle = generated.subtitle

      if(title)   this.title = title
      if(subtitle)   this.subtitle = subtitle
      
      this.show = true
    
    },
    clear(){
        this.show = false
    },
  },
});

function generateDefaultErrorData(error) {
    let errorCode = error.response.status
    let title, subtitle;
    switch (error.response.status) {
        case 400:
            title = "Bad Request";
            subtitle = "Something is wrong at your end";
            break;
        case 401:
            title = "Unauthorized";
            subtitle = "You are not authorized to access this resource";
            break;
        case 403:
            title = "Forbidden";
            subtitle = "You are not authorized to access this resource";
            break;
        case 404:
            title = "Not Found";
            subtitle = "The requested resource could not be found";
            break;
        case 500:
            title = "Internal Server Error";
            subtitle = "Something went wrong on our end";
            break;
        case 503:
            title = "Service Unavailable";
            subtitle = "The server is currently unavailable";
            break;
        default:
            title = "Bad Request";
            subtitle = "Something is wrong at your end";
    }

    return {
        title,
        errorCode,
        subtitle
    }
}