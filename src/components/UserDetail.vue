<template>
    <div>
        <h3>Viewing {{username}} Information</h3>

        <table class="table">
            <tr>
                <td>Name : </td>
                <td>{{name}}</td>
            </tr>
            <tr>
                <td>Phone : </td>
                <td>{{phone}}</td>
            </tr>
            <tr>
                <td>Contact Email : </td>
                <td>{{email}}</td>
            </tr>
        </table>
        
    </div>
</template>

<script>

    import {eventBox} from './../main'

    export default {
        data(){
            return {
            name : '',
            phone : 0,
            email : ''
            }
        },
        props: {
            username : String,
            userphone : Number,
            useremail : String
        },
        created() {
            this.name = this.username
            this.phone = this.userphone
            this.email = this.useremail
            eventBox.$on('updatedUser', function (event) {
                this.name = event.name
                this.phone = event.phone
                this.email = event.email
                console.log('newName', event )
            })
            // firebase.database().ref('users/'+this.userid).on('value', function(getUser) {
            //     console.log('getUser', getUser.val().this.userid)
            //     this.username = getUser.val().name
            //     this.userphone = getUser.val().phone
            //     this.useremail = getUser.val().email
            // });
        }
    }
</script>

<style scoped>
</style>
