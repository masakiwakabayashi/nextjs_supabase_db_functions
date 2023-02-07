import styles from '../styles/Home.module.css'
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useState } from 'react';

// supabase
import { supabase } from '../utils/supabase';

export default function Login() {
  const [email, setEmail] = useState('');

  // 送信ボタンがクリックされるとdoResetEmail関数が実行される
  const sendResetEmail = async () => {
    // supabaseで用意されているパスワード再設定のメールを送信するための関数
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      // パスワード再設定画面のリンク
      redirectTo: 'http://localhost:3000/reset_password',
    })
    if (error) throw new Error(error.message)
    console.log(data)
    // メールが送信されたことをわかりやすくするためのアラート
    alert("メールを送信しました。")
  }

  return (
    <div className={styles.card}>
      <h1>パスワード再設定メールの送信</h1>
      <div>
        <Form>
            <FormGroup>
              <Label>
                メールアドレス：
              </Label>
              <Input
                type="email"
                name="email"
                style={{ height: 50, fontSize: "1.2rem" }}
                // ユーザーが入力したメールアドレスを取得する
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <Button
                style={{ width: 220 }}
                color="primary"
                // ボタンを押すとdoResetEmaiが実行される
                onClick={()=>{
                  sendResetEmail();
                }}
              >
              送信
            </Button>
        </Form>
      </div>
    </div>
  )
}
