<template>
  <div>
    <validation-observer>
      <img class="image-setting" src="../assets/pic/wave.png">
      <img class="image-setting-2" src="../assets//pic/peopleAndCalendar.png">
      <v-container class="container">
        <div light>
          <v-img
            contain
            :src="require('assets/pic/inet_logo.png')"
            width="120"
            height="auto"
          />
        </div>
        <v-form class="form" @submit.prevent="clickLogin">
          <div>
            <strong class="text-size"> Welcome To HR Tracking </strong>
          </div>
          <div class="sign-in">
            <p>Sign in your account</p>
          </div>
          <div class="username-password">
            <p>Username</p>
          </div>
          <v-text-field
            v-model="username"
            dense
            class="text-field-username sm-6 md-3"
            solo
            :append-icon="true ? '' : ''"
            placeholder="Username"
          />
          <div class="username-password">
            <p>Password</p>
          </div>
          <v-text-field
            v-model="password"
            dense
            class="text-field-password sm-6 md-3"
            solo
            placeholder="Password"
            :append-icon="value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="value ? 'password' : 'text'"
            @click:append="() => (value = !value)"
          />
          <p v-if="incorrectUser === true" style="color: red !important; margin-left: 11%;">
            Invalid username or password
          </p>
          <div>
            <v-btn class="login-button" type="submit" color="primary">
              Log in
            </v-btn>
          </div>
        </v-form>
      </v-container>
    </validation-observer>
  </div>
</template>

<script>
import Image1 from 'assets/pic/wave.png'
import Image2 from 'assets/pic/peopleAndCalendar.png'
export default {
  data () {
    return {
      value: 'password',
      image: Image1,
      image2: Image2,
      username: '',
      password: '',
      isAdmin: false,
      isHr: false,
      isDev: false,
      incorrectUser: false
    }
  },

  methods: {
    async clickLogin () {
      try {
        const payload = {
          username: this.username,
          password: this.password
        }
        const res = await this.$axios.$post(
          'http://localhost:8001/auth/',
          payload
        )
        console.log(res)
        if (res.token) {
          // const resAdmin = await this.$axios.$get(
          //   'http://localhost:8001/auth/me'
          // )

          // console.log(resAdmin)
          if (res.result.role === 1 && res.token) {
            this.isHr = false
            this.isDev = false
            this.$router.push('/hr/hrHome')
            await this.$axios.setToken(res.token, 'Bearer')
            localStorage.setItem('hrToken', res.token)
          }

          if (res.result.role === 2 && res.token) {
            this.isAdmin = false
            this.isDev = false
            this.$router.push('/dev/devHome')
            await this.$axios.setToken(res.token, 'Bearer')
            localStorage.setItem('devToken', res.token)
          }
          if (res.result.role === 3 && res.token) {
            this.isAdmin = false
            this.isHr = false
            this.$router.push('/home')
            await this.$axios.setToken(res.token, 'Bearer')
            localStorage.setItem('adminToken', res.token)
          }
        }
      } catch (err) {
        this.incorrectUser = true
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.form {
  margin-top: 9%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-size {
  font-size: 30px;
  margin-bottom: 16px;
}

.sign-in {
  margin-top: 2%;
  margin-bottom: 3%;
  color: grey;
}

.username-password {
  color: black;
  margin-right: 14%;
  font-size: 13px;
}

.text-field-username {
  width: 42%;
  margin-left: 17%;
}

.text-field-password {
  width: 42%;
  margin-left: 17%;
}

.login-button {
  width: 300%;
  margin-left: -35%;
}

.image-setting {
  width: 47%;
  height: 100%;
  margin-left: 53%;
  position: fixed;
}

.image-setting-2 {
  width: 50%;
  height: 100%;
  margin-left: 48%;
  margin-top: 20px;
  position: fixed;
  z-index: 0;
}
</style>
