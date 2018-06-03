<template>
     <div class="container-fluid">
        <!-- <app-nav></app-nav> -->
        <div class="banner"></div>
        <div class="overlay"></div>
        <div class="row overlayContent" >
            <div class="col-md-4">
                <h1>Be A Part Of Our Team </h1>
            <h3>Click on the button below to register now!
            </h3><br>
            <button class="btn btn-primary" @click='showAside("register")'>Register</button>
            <button class="btn btn-primary" @click='showAside("userDetails")'>Sign In To view</button>
            <button class="btn btn-primary" @click='showAside("userEdit")'>Sign In To Edit</button>
            </div><br>
            <div class="col-md-7 bg-white" v-if="register||userDetails||userEdit">
                <div v-if="register" >

                    <h1>Fill in the fields correctly</h1>
                    <p>For more information contact us at contact@kodedly.com</p> 

                    <form @submit = 'createUser'>
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" class="form-control" id="name"  placeholder="Enter Full Name" v-model="name">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="000000" v-model="password">
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="text" class="form-control" id="phone" placeholder="Enter Phone Number" v-model="phone">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>

                </div>

                <app-user-detail :username='name' :userphone='phone' :useremail='email'  v-if="userDetails"></app-user-detail>
                
                <app-user-edit :username='name' :userphone='phone' :useremail='email' v-if="userEdit"></app-user-edit>
            </div>
        </div>
    </div>  
</template>

<script>
    import UserDetail from './UserDetail.vue'
    import UserEdit from './UserEdit.vue'
    import Nav from './shared/Nav.vue'
    import cardImage from './../assets/slider1.jpg'

    export default {
        data: function () {
            return {
                name: '',
                email : '',
                password : '',
                phone : 0,
                register : false,
                userDetails : false,
                userEdit : false,
                cardImage,
                userId : '',
                isLoggedIn: false
            }
        },
        computed: {
            // Formating data via the computed method made available by vue instamce 
            capitalizeName : function () {
                return toUpperCase(this.name)
            }
        },
        components: {
            // Registering Components
            appUserDetail: UserDetail,
            appUserEdit : UserEdit,
            appNav : Nav
        },
        updated() {
            let userName = this.name
            let userEmail = this.email
            let userPhone = this.phone

            firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                this.userId = user.uid
                firebase.database().ref('users/'+user.uid).set(
                    {
                        name: userName,
                        email : userEmail,
                        phone : userPhone 
                    }
                )
                // ...
            } else {
                // User is signed out.
                // ...
            }
            })
        },
        methods : {
            // Gets the updated value from the editUser child component via the custom event method
            // updateUser: function (event) {
            //     console.log(event)
            //     this.name = event.name
            //     this.age = event.age
            //     this.address = event.address
            // }
            createUser(e) {
                e.preventDefault()
                let vueInstance = this
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(function (done) {
                    alert('Your data has been captured successfully!')
                    e.target.reset()
                })
                .catch(function(error) {
                    // Handle Errors here.
                        alert(error.errorCode+' : ', error.errorMessage)
                    // ...
                })
            },
            showAside(param) {
                console.log('param :' , param)
                if (param === 'register') {
                    console.log('registre')
                    this.register = !this.register
                    this.userDetails = false
                    this.userEdit = false
                }else {
                    if (param === 'userDetails') {
                        console.log('userdetail');
                        
                        this.register = false
                        this.userDetails = !this.userDetails
                        this.userEdit = false
                    }else if (param === 'userEdit') {
                        console.log('useredi');
                        
                        this.register = false
                        this.userDetails = false
                        this.userEdit = !this.userEdit
                    }
                }
                
            },
            destroyed() {
                alert('destroyed')
            }
        }
    }
</script>

<style scoped>
    /* div {
        background-color: lightblue;
    } */
    .banner{
        background-image: url('./../assets/slider1.jpg');
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 660px;
        position: relative;
    }
    .overlay{
        position: absolute;
        width: 100%;
        background-color: rgba(14, 14, 14, .6);
        z-index: 9;
        top: 0;
        left: 0;
        height: 660px;
    }
    .overlayContent{
        position: absolute;
        z-index: 99;
        top: 30%;
        left: 12%;
        width: 100%;
        height: auto;
        color: #FFF;
        margin-left: -10%;
    }
    .bg-white{
        background-color: #FFF;
        color: #000;
        padding: 50px 100px;
    }
    .container-fluid {
    width: 100%;
    padding-right: 0;
    padding-left: 0;
    margin-right: 0;
    margin-left: 0;
}
</style>
