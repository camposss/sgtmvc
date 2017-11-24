
class StudentContentManagementSystem{
    constructor(sgtOptions){
        this.model = new SCMS_model();
        this.view = new SCMS_view(sgtOptions);
    }
    initialize(){
        this.view.initialize();
    }
}

class SCMS_view{
    constructor(viewOptions){
        this.interfaceElements = {};
        const defaultOptions = [
            'addButton', 'cancelButton','nameInput',
            'courseInput', 'gradeInput','studentDisplay'
        ];
        for(var option_i=0; option_i < defaultOptions.length; option_i++){
            if(viewOptions[ defaultOptions[ option_i] ]){
                this.interfaceElements[ defaultOptions[ option_i ] ] = viewOptions[ defaultOptions[ option_i] ];
            } else {
                console.error(`Missing option ${defaultOptions[ option_i ]}: terminating`);
                return false;
            }
        }
    }
    initialize(){ 
        this.findDomElements();
    }
    findDomElements(){
        for(let key in this.interfaceElements){
            let element = $( this.interfaceElements[key] );
            if(element.length){
                this.interfaceElements[key] = element;
            } else {
                console.error(`Missing element ${this.interfaceElements[key]}: terminating`);
                return false;               
            }
        }
    }
}

class SCMS_model{
    constructor(){

    }
}