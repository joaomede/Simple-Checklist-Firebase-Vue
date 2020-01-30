<template>
  <div class="centralDiv">
    <v-btn
      fab
      dark
      small
      color="primary"
      fixed
      right
      bottom
      @click="(dialogCreateNewChecklist = true), reset()"
    >
      <v-icon dark>
        fas fa-plus
      </v-icon>
    </v-btn>

    <v-card class="my-card">
      <h2 class="text-center">
        Your Checklist
      </h2>

      <v-tabs
        v-model="tab"
        background-color="indigo"
        centered
        dark
        icons-and-text
      >
        <v-tab href="#pending">
          Pending
          <v-icon>far fa-clock</v-icon>
        </v-tab>

        <v-tab href="#complete">
          Complete
          <v-icon>fas fa-clipboard-check</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="pending">
          <v-card style="height: 90%">
            <v-list-item
              v-for="item in listChecklistNonComplete"
              :key="item.idChecklist"
              @click="showTask(item)"
            >
              <div />

              <v-list-item-avatar>
                <v-icon
                  class="far fa-clock"
                  v-text="item.icon"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  icon
                  @click="checklist = item; dialogDeleteConfirm = true"
                >
                  <v-icon color="red">
                    far fa-trash-alt
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-tab-item>

        <v-tab-item value="complete">
          <v-card style="height: 90%">
            <v-list-item
              v-for="item in listChecklistComplete"
              :key="item.idChecklist"
              @click="''"
            >
              <v-list-item-avatar>
                <v-icon
                  class="far fa-clock"
                  v-text="item.icon"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="red">
                    far fa-trash-alt
                  </v-icon>
                </v-btn>
              </v-list-item-action>

              <v-list-item-action style="margin-left: 1px;">
                <v-btn icon>
                  <v-icon color="red">
                    far fa-trash-alt
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-dialog v-model="dialogCreateNewChecklist">
      <v-card>
        <h2 class="text-center">
          Your Checklist
        </h2>
        <v-col
          cols="12"
          sm="12"
        >
          <v-text-field
            v-model="checklist.title"
            label="Title for checklist"
          />
          <v-text-field
            v-model="checklist.content"
            label="Content for checklist"
          />

          <div class="text-center my-2">
            <v-btn
              color="primary"
              class="ma-2"
              @click="dialogCreateNewChecklist = false"
            >
              Back
            </v-btn>
            <v-btn
              color="green"
              dark
              class="ma-2"
              @click="createChecklist()"
            >
              Register
            </v-btn>
          </div>
        </v-col>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogShowTask"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ checklist.title }}
        </v-card-title>

        <v-card-text>
          {{ checklist.content }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="blue darken-1"
            text
            @click="dialogShowTask = false"
          >
            Back
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="''"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checklist: {
        title: "",
        content: "",
        complete: false,
        createdAt: null,
        finishDate: null
      },
      listChecklistComplete: [],
      listChecklistNonComplete: [],

      tab: null,

      dialogCreateNewChecklist: null,
      dialogShowTask: null
    };
  },
  watch: {
    user: "init"
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.user.uid != null) {
        this.loadingChecklist();
      }
    },
    loadingChecklist() {
      this.databaseChecklist.where("complete", "==", true).onSnapshot(doc => {
        this.listChecklistComplete = [];
        doc.forEach(complete => {
          this.listChecklistComplete.push(complete.data());
        });
      });

      this.databaseChecklist.where("complete", "==", false).onSnapshot(doc => {
        this.listChecklistNonComplete = [];
        doc.forEach(nonComplete => {
          this.listChecklistNonComplete.push(nonComplete.data());
        });
      });
    },
    createChecklist() {
      const a = this.checklist.title;
      const b = this.checklist.content;

      if ((a == null) | (a == "")) {
        console.log("Erro, the title is empty");
      }
      if ((b == null) | (b == "")) {
        console.log("Erro, the content is empty");
      } else {
        this.databaseChecklist
          .add(this.checklist)
          .then(ref => {
            const update = {
              idChecklist: ref.id,
              createdAt: this.$timestamp
            };
            ref
              .update(update)
              .then(() => {
                console.log("ok");
              })
              .catch(() => {
                console.log("erro");
              });
          })
          .catch(() => {
            console.log("erro");
          });
        this.dialogCreateNewChecklist = false;
      }
    },
    updateChecklist(object) {
      this.dbChecklist
        .update(object)
        .then(() => {
          // ok
        })
        .catch(() => {
          // error
        });
    },
    deleteChecklist() {
      this.dbChecklist
        .delete()
        .then(() => {
          // ok
        })
        .catch(() => {
          // error
        });
    },
    showTask(obj) {
      this.checklist = obj;
      this.dialogShowTask = true;
    },
    reset() {
      this.checklist = {
        title: null,
        content: null
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>