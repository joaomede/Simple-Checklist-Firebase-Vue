export default {
  computed: {
    user() {
      if (this.$store.getters.getUser != null) {
        return this.$store.getters.getUser;
      } else {
        return { uid: null, email: null, name: null };
      }
    },
    permissionAdmin() {
      if (this.user.uid != null) {
        if (this.$store.getters.getUser.permission == "admin") {
          return true;
        }
      } else {
        return false;
      }
    },
    databaseChecklist() {
      if (this.user.uid != null) {
        return this.$db
          .collection("app")
          .doc(this.user.uid)
          .collection("checklist");
      } else {
        return null;
      }
    },
    settingsColor() {
      if (this.$store.getters.getSettingsColor != null) {
        return this.$store.getters.getSettingsColor;
      } else {
        return null;
      }
    },
    versionCloud() {
      if (this.$store.getters.getVersion != null) {
        return this.$store.getters.getVersion;
      } else {
        return null;
      }
    }
  }
};
