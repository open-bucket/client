export default (fn) => () => {
  this.getFieldsValue();
  this.fn();
};
