<template>
  <div style="background-color: #e5efff">
    <div>
      <nav class="d-flex justify-space-between align-center primary">
        <div class="d-flex align-center">
          <img src="../../assets/pic/inet_logo2.png">
          <p style="margin-top: 16px; margin-left: 16px; color: white">
            HR-Tracking
          </p>
        </div>
        <div>
          <v-card
            class="d-flex"
            style="background-color: #6aa1d3; color: white"
          >
            <v-btn color="#CDDFF0" @click="dropdown = !dropdown">
              <div>
                <div class="d-flex flex-column">
                  <span>{{ user.firstName }} {{ user.surName }}</span>
                  <span>{{ user.role }}</span>
                </div>
              </div>
            </v-btn>
          </v-card>
          <v-card v-if="dropdown === true" class="menuBar">
            <v-card-subtitle class="v-subtitle" align="center">
              {{ user.firstName }} {{ user.surName }}
            </v-card-subtitle>
            <v-card-subtitle align="center">
              {{ user.role }}
            </v-card-subtitle>
            <v-btn block @click="signOut">
              Sign out
            </v-btn>
          </v-card>
        </div>
      </nav>
    </div>
    <div
      class="d-flex"
      style="margin-left: 11%; margin-top: 2%; margin-bottom: 1%"
    >
      <b>รายการปัญหาในการใช้ระบบ</b>
    </div>
    <v-row style="margin-left: 10%; margin-right: 10%">
      <v-col>
        <button @click="filterfunc(0)">
          <v-hover>
            <v-card
              class="mx-auto"
              width="210"
              outlined
              @click="allList = true"
            >
              <v-list-item three-line>
                <v-list-item-avatar
                  tile
                  class="rounded-xl"
                  size="80"
                  :color="allList ? '#3C7DE5' : '#E5EFFF'"
                />
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    ทั้งหมด
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ listAll.length }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-hover>
        </button>
      </v-col>
      <v-col>
        <button @click="filterfunc(1)">
          <v-hover>
            <v-card
              class="mx-auto"
              max-width="210"
              outlined
              @click="waitToFix = true"
            >
              <v-list-item three-line>
                <v-list-item-avatar
                  tile
                  class="rounded-xl"
                  size="80"
                  :color="waitToFix ? '#C38F31' : '#FCF0DA'"
                />
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    รอแก้ไข
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ countWait }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-hover>
        </button>
      </v-col>
      <v-col>
        <button @click="filterfunc(2)">
          <v-hover>
            <v-card
              class="mx-auto"
              max-width="210"
              outlined
              @click="checkingDev = true"
            >
              <v-list-item three-line>
                <v-list-item-avatar
                  tile
                  class="rounded-xl"
                  size="80"
                  :color="checkingDev ? '#DD3F2D' : '#FFE4E1'"
                />
                <v-list-item-content>
                  <div class="text-overline box">
                    dev ตรวจสอบ
                  </div>
                  <v-list-item-title class="text-h5">
                    {{ countCheck }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-hover>
        </button>
      </v-col>
      <v-col>
        <button @click="filterfunc(3)">
          <v-hover>
            <v-card
              class="mx-auto"
              max-width="210"
              outlined
              @click="fixedByDev = true"
            >
              <v-list-item three-line>
                <v-list-item-avatar
                  tile
                  class="rounded-xl"
                  size="80"
                  :color="fixedByDev ? '#00B8C0' : '#E7FEFF'"
                />
                <v-list-item-content>
                  <div class="text-overline box">
                    DEV แก้ไขแล้ว
                  </div>
                  <v-list-item-title class="text-h5">
                    {{ countDone }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-hover>
        </button>
      </v-col>
      <v-col>
        <button @click="filterfunc(4)">
          <v-hover>
            <v-card
              class="mx-auto"
              max-width="210"
              outlined
              @click="hrApprove = true"
            >
              <v-list-item three-line>
                <v-list-item-avatar
                  tile
                  class="rounded-xl"
                  size="80"
                  :color="hrApprove ? '#326826' : '#F0F9EE'"
                />
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    HR ยืนยัน
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ countApprove }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-hover>
        </button>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" style="margin-left: 10%">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          outlined
          dense
          style="background-color: #ffffff"
        />
      </v-col>
      <v-col align="right" style="margin-right: 11%">
        <v-btn color="primary" dark class="mb-2" @click="report()">
          แจ้งปัญหา
        </v-btn>
      </v-col>
    </v-row>
    <div style="margin-left: 10%; margin-right: 10%; margin-top: 1%">
      <v-data-table
        :headers="headers"
        :items="getdetail"
        :search="search"
        class="elevation-1"
        :show-select="showSelect"
      >
        <template #top>
          <v-toolbar flat>
            <p style="margin-top: 1%">
              รายการปัญหา
            </p>
            <v-spacer />
            <v-dialog v-model="dialog" max-width="1000px">
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="ชื่อระบบ"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cause"
                        label="ปัญหาที่พบ"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.detail"
                        label="รายละเอียด"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.error_date"
                            label="วันที่พบปัญหา"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="editedItem.error_date"
                          @input="menu2 = false"
                        />
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.error_time"
                            label="เวลาที่พบปัญหา"
                            prepend-icon="mdi-timer-outline"
                            v-bind="attrs"
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-model="editedItem.error_time"
                          scrollable
                          format="24hr"
                          @input="menu3 = true"
                        />
                      </v-menu>
                    </v-col>
                    <v-col>
                      <v-file-input
                        id="fileInput"
                        v-model="editedItem.path"
                        clearable
                        label="รูปอ้างอิง"
                        variant="underlined"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" text @click="close">
                    ยกเลิก
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="createReport()">
                    บันทึก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogEdit" max-width="1000px">
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="ชื่อระบบ"
                        readonly
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cause"
                        label="ปัญหาที่พบ"
                        readonly
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.detail"
                        label="รายละเอียด"
                        readonly
                      />
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.status"
                        :items="status"
                        outlined
                        dense
                        readonly
                      />
                    </v-col> -->
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <!-- <v-btn color="blue darken-1" text @click="closeEdit">
                    ยกเลิก
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="updateReport">
                    บันทึก
                  </v-btn> -->
                  <v-col v-if="editedItem.status === 3" style="padding-left: 15%;">
                    <v-btn color="primary" @click="changeStatus">
                      HR ยืนยัน
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogPic" max-width="1000px">
              <v-card>
                <embed
                  type="image/jpg"
                  src="../../assets/pic/peopleAndCalendar.png"
                >
                <!-- <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="closePic">
                      ปิด
                    </v-btn>
                  </v-card-actions> -->
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template #[`item.actions`]="{ item }">
          <v-icon small class="mr-2" color="primary" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" color="primary" @click="showPic()">
            <!-- เพิ่ม @click เพื่อดูไฟล์แนบทีหลัง-->
            mdi-file-document-outline
          </v-icon>
        </template>

        <template #no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'hrToken',
  data () {
    return {
      getdetail: [],
      user: {
        firstName: '',
        surName: '',
        userId: null,
        role: ''
      },
      counter: 1,
      countWait: 0,
      countCheck: 0,
      countDone: 0,
      countApprove: 0,
      search: '',
      selected: [],
      listAll: [],
      showSelect: false,
      allList: true,
      waitToFix: false,
      checkingDev: false,
      fixedByDev: false,
      hrApprove: false,
      dropdown: false,
      status: [
        { text: 'รอแก้ไข', value: 1 },
        { text: 'HR ยืนยัน', value: 4 }
      ],
      dialog: false,
      dialogEdit: false,
      dialogPic: false,
      menu2: false,
      menu3: false,
      headers: [
        { text: 'ลำดับ', value: 'id', align: 'center', sortable: false },
        { text: 'ชื่อระบบ', value: 'name', sortable: false },
        { text: 'ปัญหาที่พบ', value: 'cause', sortable: false },
        { text: 'รายละเอียด', value: 'detail', sortable: false },
        { text: 'วันที่และเวลา', value: 'error_date', sortable: false },
        { text: 'ไฟล์แนบ', value: 'actions', align: 'center', sortable: false }
      ],
      editedItem: {
        id: null,
        name: null,
        detail: null,
        cause: null,
        error_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        error_time: null,
        path: null,
        status: 1
      }
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogEdit (val) {
      val || this.closeEdit()
    },
    dialogPic (val) {
      val || this.closePic()
    }
  },

  mounted () {
    this.getData()
    this.getHr()
  },

  methods: {
    initialize () {
      this.getdetail = []
    },

    editItem (item) {
      this.editedItem.id = item.id
      this.editedItem.name = item.name
      this.editedItem.detail = item.detail
      this.editedItem.cause = item.cause
      // this.editedItem.error_date = item.error_date
      this.editedItem.status = item.status
      this.dialogEdit = true
    },

    close () {
      this.dialog = false
    },
    closeEdit () {
      this.dialogEdit = false
    },
    closePic () {
      this.dialogPic = false
    },
    report () {
      this.dialog = true
    },
    showPic () {
      this.dialogPic = true
    },
    async updateReport () {
      try {
        const payload = {
          id: this.editedItem.id,
          name: this.editedItem.name,
          cause: this.editedItem.cause,
          detail: this.editedItem.detail,
          // path: this.editedItem.path.name,
          status: this.editedItem.status
        }
        await this.$axios.$post('http://localhost:8001/report/hrUpdate', payload)
      } catch (err) {
        console.log(err)
      }
      this.closeEdit()
      await this.$swal({
        icon: 'success',
        showConfirmButton: false,
        title: 'Report has been updated',
        timer: 2000
      })
      window.location.reload()
    },

    async changeStatus () {
      try {
        if (this.editedItem.status === 3) {
          const payload = {
            id: this.editedItem.id
          }
          console.log(payload)
          await this.$axios.$post('http://localhost:8001/report/changeToApprove', payload)
          this.closeEdit()
          await this.$swal({
            icon: 'success',
            showConfirmButton: false,
            title: 'Report has been updated',
            timer: 2000
          })
          window.location.reload()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async createReport () {
      try {
        const payload = {
          name: this.editedItem.name,
          detail: this.editedItem.detail,
          cause: this.editedItem.cause,
          error_date: this.editedItem.error_date,
          error_time: this.editedItem.error_time,
          firstName: this.user.firstName,
          surName: this.user.surName,
          userId: this.user.userId
        }
        await this.$axios.$post(
          'http://localhost:8001/report/hrCreate',
          payload
        )
      } catch (error) {
        console.log(error)
      }
      this.close()
      await this.$swal({
        icon: 'success',
        showConfirmButton: false,
        title: 'Report has been created',
        timer: 2000
      })
      window.location.reload()
    },
    async getHr () {
      try {
        const hrDetail = await this.$axios.$get(
          'http://localhost:8001/report/getHr'
        )
        this.user.firstName = hrDetail.result.firstName
        this.user.surName = hrDetail.result.surName
        this.user.role = hrDetail.result.role
        this.user.userId = hrDetail.result.user_id
      } catch (err) {
        console.log(err)
      }
    },
    async getData () {
      try {
        const res = await this.$axios.$get(
          'http://localhost:8001/report/hrReport'
        )
        const result = res.result.map((element) => {
          element.error_date = this.formatDateToCustom(element.error_date)
          return element
        })
        this.getdetail = result
        this.listAll = result
        for (let i = 0; i < this.getdetail.length; i++) {
          if (res.result[i].status === 1) {
            this.countWait++
          }
          if (res.result[i].status === 2) {
            this.countCheck++
          }
          if (res.result[i].status === 3) {
            this.countDone++
          }
          if (res.result[i].status === 4) {
            this.countApprove++
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    formatDateToCustom (createAt) {
      const date = new Date(createAt)

      const day = date.getDate().toString().padStart(2, '0')
      const month = date.getMonth() + 1 // Note that months are zero-based
      const year = date.getFullYear() + 543
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')

      // Convert the numeric month to a two-digit string
      const formattedMonth = month < 10 ? `0${month}` : `${month}`
      // const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

      // Construct the formatted date string
      const formattedDate = `${day}/${formattedMonth}/${year} ${hours}:${minutes} น.`

      return formattedDate
    },

    async signOut () {
      await localStorage.removeItem('hrToken')
      await localStorage.clear()
      this.$router.push('/')
    },
    // dateTest (date) {
    //   const formattedDate = new Date().toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' })

    //   return formattedDate
    // },

    filterfunc (test) {
      if (test === 1) {
        this.getdetail = this.listAll.filter(element => element.status === 1)
        this.allList = false
        this.checkingDev = false
        this.fixedByDev = false
        this.hrApprove = false
      } else if (test === 2) {
        this.getdetail = this.listAll.filter(element => element.status === 2)
        this.allList = false
        this.waitToFix = false
        this.fixedByDev = false
        this.hrApprove = false
      } else if (test === 3) {
        this.getdetail = this.listAll.filter(element => element.status === 3)
        this.allList = false
        this.checkingDev = false
        this.waitToFix = false
        this.hrApprove = false
      } else if (test === 4) {
        this.getdetail = this.listAll.filter(element => element.status === 4)
        this.allList = false
        this.waitToFix = false
        this.checkingDev = false
        this.fixedByDev = false
      } else {
        this.getdetail = this.listAll
        this.waitToFix = false
        this.checkingDev = false
        this.hrApprove = false
        this.fixedByDev = false
      }
    }
  }
}
</script>

<style>
.menuBar {
  position: fixed;
  z-index: 1;
  padding: 10px 21px
}

.box {
  margin-bottom: -16px !important
}
</style>
