<template>

    <div class="password-container">
      <input ref="pwd"
             type="number"
             maxlength="6"
             autofocus
             v-model="password"
             style="position: absolute;z-index: -1;left:-100%;opacity: 0" />
      <ul class="pwd-wrap"
          @click="focus">
        <li ><i v-if="valLength > 0"></i></li>
        <li><i v-if="valLength > 1"></i></li>
        <li><i v-if="valLength > 2"></i></li>
        <li><i v-if="valLength > 3"></i></li>
        <li><i v-if="valLength > 4"></i></li>
        <li><i v-if="valLength > 5"></i></li>
      </ul>
    </div>

</template>

<script>
export default {
  name: "password",
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      password: "", // 密码值
      valLength: 0 //input输入框值的长度
    };
  },
  created() {
    this.password = String(this.value);
    this.valLength = this.password.length;
  },
  computed: {},
  watch: {
    //监听组件外部密码值的变化，更新组件内的密码值
    value(val, oldVal) {
      console.log(123);
      if (val != oldVal) {
        this.password = val;
      }
    },
    // 监听组件内密码值的变化，将值传递给父组件
    password(curVal, oldval) {
      if (curVal !== oldval) {
        this.valLength = curVal.length;
        this.$emit("input", curVal);
        this.$emit("changeItem", curVal);
      }
    }
  },
  methods: {
    // 点击ul元素，触发input输入框焦点
    focus() {
      this.$refs.pwd.focus();
    }
  }
};
</script>

<style lang="scss" scoped>


.password-container {
  position: relative;
}
.pwd-wrap {
  width: 100%;
  height: 50px;
  border: 1px solid #777;
  display: flex;
  cursor: pointer;
  border-radius: 0.2rem;
  overflow: hidden;
}
.pwd-wrap li {
  width: 50px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  list-style-type: none;
  text-align: center;
  flex: 1;
  border-right: 1px solid #777;
  background: rgba(28, 28, 28,0.65);
}
.pwd-wrap li:last-child {
  border-right: 0;
}
.pwd-wrap li i {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #fff;
  display: inline-block;
}
</style>

