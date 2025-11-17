// Generate UUID v4 sederhana
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Custom UUID widget untuk Decap CMS
class UUIDControl extends window.CMS.getWidget("string").control {
  componentDidMount() {
    if (!this.props.value) {
      const uuid = generateUUID();
      this.props.onChange(uuid);
    }
  }
}

window.CMS.registerWidget(
  "uuid",
  UUIDControl,
  window.CMS.getWidget("string").preview
);
