function nhanVien(){
    this.account = '',
    this.name = '',
    this.email = '',
    this.password = '',
    this.workDay = '',
    this.salary = 0,
    this.position = '',
    this.timesMonth = 0,
    this.earn = function(){
        if(this.position === 'Giám đốc'){
            return this.salary*3;
        }
        else if(this.position ==='Trưởng phòng'){
            return this.salary*2;
        }
        else{
            return this.salary;
        }
    },
    this.rank = function(){
        if(this.timesMonth >= 192){
            return 'Xuất sắc';
        }
        else if(this.timesMonth>=176){
            return 'Giỏi';
        }
        else if(this.timesMonth>=160){
            return 'Khá';
        }
        else if(this.timesMonth<176){
            return 'Trung bình';
        }
    }
}