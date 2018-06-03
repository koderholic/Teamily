<template>
    <div>
        <h3>You Want To Edit {{name}} Information </h3>
        <p>Update only necessary fields</p>

        <div class="col-md-12">
            <form @submit="updatedUser">
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
                    <label for="phone">Phone Number</label>
                    <input type="text" class="form-control" id="phone" placeholder="Enter Phone Number" v-model="phone">
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>

    </div>
</template>

<script>

    import {eventBox} from "./../main"

    export default {
        data : function () {
            // Define component own data
            return {
                name : '',
                phone : 0,
                email : ''
            }
        },
        props: {
            // defines parent data
            username : String,
            userphone : Number,
            useremail : String
        },
        created : function () {
            // On creation make component data same as parent data gotten from the props
            this.name = this.username
            this.phone = this.userphone
            this.email = this.useremail
        },
        methods : {
            updateUser: function (e) {
                e.preventDefault()
                let updatedUser = {
                    name :  this.name, 
                    phone : this.phone, 
                    email  : this.email
                }
                // this.$emit('updatedUser',updatedUser)
                eventBox.$emit('updatedUser',updatedUser)
            },
            sendUpdate : function (val) {
                console.log(val)
                let updatedUser = {
                    name :  ('name' in val)? val.name : this.name, 
                    phone : ('phone' in val)? val.phone : this.phone, 
                    email  : ('email' in val)? val.email : this.address, 
                }
                eventBox.$emit('updatedUser',updatedUser)
            }
        },
        watch : {
            // Watches the child components dat for changes and updates the parent
            name : function (val) {
                this.sendUpdate({name : val})
            },
            phone : function (val) {
                this.sendUpdate({phone : Number(val)})
            },
            address : function (val) {
                this.sendUpdate({address : val})
            },
            // Watches the parent component for changes and updates the child,Alternative to rerender
            username : function (val) {
                this.name = this.username
            },
            userphone : function (val) {
                this.phone = this.userphone
            },
            useremail : function (val) {
                this.address = this.useremail
            }
        }
    }
</script>

<style scoped>
</style>
