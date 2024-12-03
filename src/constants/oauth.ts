class OAuth {
  #KAKAO_REST_API = import.meta.env.VITE_KAKAO_REST_API;
  #KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  kakao() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.#KAKAO_REST_API}&redirect_uri=${this.#KAKAO_REDIRECT_URI}&response_type=code`;
  }
}

export const OAUTH = new OAuth();
