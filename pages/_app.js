import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '../utils/supabase'
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // パスワードを忘れた場合に再設定するための関数 これがないとパスワード再設定のときにエラーが起きる
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // パスワード再設定のときにログインしていない状態でもパスワードを変更できるようにするための処理
      if (event == 'PASSWORD_RECOVERY') {
        console.log('PASSWORD_RECOVERY', session)
        showPasswordResetScreen(true)
      }
    })
  },[])

  return <Component {...pageProps} />
}
