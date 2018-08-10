import PushNotification from 'react-native-push-notification';

// export function getData(when){
//     var data;
//     if(when === 'today'){
//         data =[
//             {
//                 matkul: "Pengantar teknik informatika",
//                 dosen: "suriayani ST.MT",
//                 time: "09:30",
//                 room:"E402",
//                 status: "Masuk",
//                 tugas: "Menbuat rangkuman dari materi minggu lalu dikumpul pertemuan berikutnya"
//             },
//             {
//                 matkul: "Matematika komputer",
//                 dosen: "Andi Muhammad Syafar ST.MT",
//                 time: "11:15",
//                 room:"E403",
//                 status: "Masuk",
//                 tugas:"Persentasi kelompok 2"
//             },
//             {
//                 matkul: "Fisika",
//                 dosen: "Faisal ST.MT",
//                 time: "12:40",
//                 room:"E404",
//                 status: "Masuk",
//                 tugas: "persentasi"
//             },
//             {
//                 matkul: "Pengantar teknik informatika",
//                 dosen: "suriayani ST.MT",
//                 time: "09:30",
//                 room:"E402",
//                 status: "Masuk",
//                 tugas: "Tidak ada tugas"
//             },
//             {
//                 matkul: "Pengantar teknik informatika",
//                 dosen: "suriayani ST.MT",
//                 time: "09:30",
//                 room:"E402",
//                 status: "Masuk",
//                 tugas: "tidak ada tugas"
//             },
//         ];  
//     }else{
//         data = [
//             {
//                 matkul: "Pengantar teknik informatika",
//                 dosen: "suriayani ST.MT",
//                 time: "09:30",
//                 room:"E402",
//                 status: "Masuk",
//                 tugas: "Menbuat rangkuman dari materi minggu lalu dikumpul pertemuan berikutnya"
//             },
//             {
//                 matkul: "Matematika komputer",
//                 dosen: "Andi Muhammad Syafar ST.MT",
//                 time: "11:15",
//                 room:"E403",
//                 status: "Masuk",
//                 tugas:"Persentasi kelompok 2"
//             },
//             {
//                 matkul: "Fisika",
//                 dosen: "Faisal ST.MT",
//                 time: "12:40",
//                 room:"E404",
//                 status: "Masuk",
//                 tugas: "persentasi"
//             },
//             {
//                 matkul: "Pengantar teknik informatika",
//                 dosen: "suriayani ST.MT",
//                 time: "09:30",
//                 room:"E402",
//                 status: "Masuk",
//                 tugas: "Tidak ada tugas"
//             },
//             {
//                 matkul: "Pengantar teknik informatika",
//                 dosen: "suriayani ST.MT",
//                 time: "09:30",
//                 room:"E402",
//                 status: "Masuk",
//                 tugas: "tidak ada tugas"
//             },
//         ];
//     }
//     return data;
// }
var host = 'http://192.168.22.2/kuliahkuapi/index.php';

export function getData(token,onSucces,onError = function(){}){
    fetch(host+'/jadwal',{
        method: 'GET',
        headers: {
            'content-type':'application/json',
            'Authorization' : 'Bearer '+token
        }  
    }).then((respon) => {
        return respon.json();
    }).then((json) => {
        fetch(host + '/all', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            return res.json();
        }).then((res) => {
            let result = {
                ...json,
                all : res
            }
            onSucces(result);
        })
        
    }).catch((err) => {
        onError(err);
    })
}

export function authUser(nim,pass,callback,errcalback){
    fetch(host+"/login",{
        method: 'POST',
        headers: {
            'content-type':'application/json',
        },
        body: JSON.stringify({
            'nim':nim,
            'pass':pass
        })
    }).then((res) => {
        return res.json();
    }).then((json) => {
        callback(json);
    }).catch((err) => {
    	errcalback(err);
    });
}

export function kuliahList(token,callback){
    fetch(host+'/kuliah',{
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer '+token
        },
    }).then((res) => {
        return res.json();
    }).then((json) => {
        callback(json)
    })
}

export function update(token,data,callback){
    fetch(host+'/jadwal',{
        method : 'PUT',
        headers : {
            'Authorization' : 'Bearer '+token
        },
        body : JSON.stringify(data),
    }).then((res) => {
        return res.json();
    }).then((json) => {
        callback(json)
    })
}

export function kuliahById(token,id,callback){
    fetch(host+'/kuliah/'+id,{
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer '+token
        }
    }).then((res) => {
        // console.log(res);
        return res.json();
    }).then((json) => {
        callback(json);
    });
}

export function getAll(token,callback,err =  () => {}){
    fetch(host+'/all',{
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer '+token
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        console.log(res,"api")
        callback(res);
    })
}

export function getTugas(token,id,callback = () => {}) {
    fetch(host + '/tugas/'+id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        callback(res);
    })
}

export function addTugas(token,data,callback = () => {}) {
    fetch(host + '/tugas', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body : JSON.stringify(data)
    }).then((res) => {
        return res.json();
    }).then((res) => {
        callback(res);
    })
}

export function fireNotif(msg){
    PushNotification.localNotification({
      message: msg, // (required)
      
    });
  }


// export var ws = new WebSocket("ws://localhost:4444/jadwal");

//     ws.onopen = () => {
//       let data = {
//         action : 'auth',
//         data : {
//           id : 'nursan'
//         }
//       }

//       ws.send(JSON.stringify(data))
//     }


    
//     // ws.onmessage = function(e) {
//     //   console.log(e.data);
//     //   let res =  JSON.parse(e.data);

//     //   if(res.action === 'log'){
//     //     fireNotif(res.data);
//     //   }else{
//     //     fireNotif(res.msg);
//     //   }
//     // };
// export var gmsg = {fsf:"hai"};