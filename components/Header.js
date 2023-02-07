import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';

// supabaseをインポート
import { supabase } from '../utils/supabase';

// useRouterをインポート
import { useRouter } from 'next/router';

const Header = () => {
  const [currentUser, setcurrentUser] = useState('');
  // routerを使うための記述
  const router = useRouter();

    // 現在ログインしているユーザーを取得する処理
  const getCurrentUser = async () => {
    // ログインのセッションを取得する処理
    const { data } = await supabase.auth.getSession()
    // セッションがあるときだけ現在ログインしているユーザーを取得する
    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      const { data: { user } } = await supabase.auth.getUser()
      // currentUserにユーザーのメールアドレスを格納
      setcurrentUser(user.email)
    }
  }

  // HeaderコンポーネントがレンダリングされたときにgetCurrentUser関数が実行される
  useEffect(()=>{
    getCurrentUser()
  },[])

  // ログアウトの処理を追加
  const doLogout = async () => {
    // supabaseに用意されているログアウトの関数
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    // ログアウトを反映させるためにリロードさせる
    router.reload()
  }

  // ログアウトボタンも追加
  return (
    <div style={{ padding: "1rem" }} >
      { currentUser ? (
        // サーバーサイドとクライアントサイドでレンダーされる内容が違うときにエラーがでないようにする
        <div suppressHydrationWarning={true}>
          <div style={{ paddingBottom: "1rem" }}>{ currentUser } でログインしています。</div>
          <div>
            <Button onClick={()=>{
              doLogout();
            }} >
              ログアウト
            </Button>
          </div>
        </div>
      ):(
        <div suppressHydrationWarning={true}>ログインしていません。</div>
      )}
    </div>
  );
}

export default Header;


