import styles from '../styles/Home.module.css'
import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';
// supabaseをインポート
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';


const ClickCountPage = () => {
  // ログインユーザー
  const [currentUser, setcurrentUser] = useState('');
  const router = useRouter();
  // クリック数
  const [clickCount, setClickCount] = useState(0);

  // 現在ログインしているユーザーを取得する処理
  const getCurrentUser = async () => {
    // セッションがある場合はログインしているユーザーを取得し、ない場合はログインページに遷移させる
    const { data } = await supabase.auth.getSession()
    if (data.session !== null) {
      const { data: { user } } = await supabase.auth.getUser()
      setcurrentUser(user.id)
    } else {
      router.push('/login')
    }
  }

  // ページが読み込まれたときにgetCurrentUser()を実行
  useEffect(()=>{
    getCurrentUser()
  },[])

  // supabaseのclicksテーブルからクリック数を取得する処理
  const getClickCount = async () => {
    // supabaseのprofilesテーブルから現在ログインしているユーザーのclicksカラムの値を取得
    const { data, error } = await supabase
      .from('profiles')
      .select('clicks')
      .eq('id', currentUser)
      .single();
    // エラーが起きたときにコンソールに出力
    if (error) console.error(error)
    // supabaseから取得したクリック数をclickCountにセット
    setClickCount(data.clicks)
  }

  // ログインしているユーザーを取得できているときだけgetClickCount()を実行
  if (currentUser !== '') {
    getClickCount()
  }

  // クリック数を取得する処理
  const handleClick = async () => {
    // database functionを呼び出す処理
    const { data, error } = await supabase.rpc('test_increment')
    // エラーが起きたときはコンソールにエラーを表示
    if (error) console.error(error)
    // 画面に表示するクリック数を更新する処理
    setClickCount(data)
  }

  return (
    <div className={styles.card}>
      <div style={{ paddingBottom: "1rem" }}>
        { currentUser } でログインしています。
        クリック数: { clickCount }
      </div>
      <Button color="primary" onClick={handleClick}>
        クリック
      </Button>
    </div>
  );
}

export default ClickCountPage;