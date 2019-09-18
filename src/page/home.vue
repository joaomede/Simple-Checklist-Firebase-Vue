<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      checklist: {
        title: "",
        content: "",
        complete: false,
        createdAt: null
      },
      listChecklistComplete: [],
      listChecklistNonComplete: []
    };
  },
  methods: {
    lodingChecklist() {
      this.dbChecklist.where("complete", "==", true).onSnapshot(doc => {
        doc.forEach(complete => {
          this.listChecklistComplete.push(complete.data());
        });
      });

      this.dbChecklist.where("complete", "==", false).onSnapshot(doc => {
        doc.forEach(nonComplete => {
          this.listChecklistNonComplete.push(nonComplete.data());
        });
      });
    },
    createChecklist() {
      this.dbChecklist
        .add(this.checklist)
        .then(ref => {
          const update = {
            idChecklist: ref.id,
            createdAt: this.$timestamp
          };
          ref
            .update(update)
            .then(() => {
              // ok
            })
            .catch(() => {
              // erro 2
            });
        })
        .catch(() => {
          // error
        });
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
    }
  },
  created() {},
  computed: {
    dbChecklist() {
      if (this.user.uid != null) {
        return this.$db.collection("app");
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>