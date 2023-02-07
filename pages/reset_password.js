import styles from '../styles/Home.module.css'
// 現時点で使わないものもあるが今後のことを考えて入れておく
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useState } from 'react';

// supabase
import { supabase } from '../utils/supabase';
// useRouterをインポート
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  // パスワードを変更する処理
  const doResetPassword = async () => {
    // supabaseで用意されているユーザー情報を変更するための関数
    const { user, error } = await supabase.auth.updateUser(
        // ユーザーが入力したパスワードがsetPasswordでpasswordに格納される
        {
          password: password
        }
      )
    if (error) throw new Error(error.message)
    // ログインページに遷移
    router.push('/login')
  }

  return (
    <div className={styles.card}>
      <h1>新しいパスワードを入力してください。</h1>
      <div>
        <Form>
            <FormGroup>
              <Label>
                パスワード：
              </Label>
              <Input
                type="password"
                name="password"
                style={{ height: 50, fontSize: "1.2rem" }}
                // ユーザーが入力したメールアドレスを取得する
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button
                style={{ width: 220 }}
                color="primary"
                // ボタンを押すとdoResetEmaiが実行される
                onClick={()=>{
                  doResetPassword();
                }}
              >
              送信
            </Button>
        </Form>
      </div>
    </div>
  );
}

