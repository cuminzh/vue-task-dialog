import {Tools} from "../utils/tools";

export default {
  data() {
    return {
      onFetching: false,
      dialogPage: 0,
    }
  },
  methods: {
    scrollLoad: Tools._throttle(function () {
      {
        let scrollbar1 = document.getElementsByClassName('container-full__body')
        let scrollbar = [...scrollbar1].pop()
        if (this.onFetching) {
          // do nothing
        } else {
          if (scrollbar.scrollTop + scrollbar.offsetHeight ===
              scrollbar.scrollHeight &&
              scrollbar.offsetHeight !== scrollbar.scrollHeight) {
            this.onFetching = true
            setTimeout(() => {
              // this.pagination.page += 1 //watch加载列表
              this.load()
              this.onFetching = false
            }, 500)
          }
        }
      }
    }, 200)
  }
}
