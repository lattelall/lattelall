■memo■
---------------------------------------------------------------------
;;; room部屋/画面
; preparation処繰/harvesting珊素/modulation調捩/(history履歴)
;;; chara
; sekiseki析積/mituguri貢繰/tamasiro_sen珊素繊/tamasiro_ko珊素甲/tamasiro_syo珊素奬
;;; act
; 素材取得/材料作成/材料適用/材料売却
;;; parameta
;; mituguri
; 
;; tamasiro
; 

;; set_btnmenu
; @param room preparation/harvesting/modulation/
@set_btnmenu room="preparation"

;; set_chara
; @param chara sekiseki/rutubo/tamasiro_sen/tamasiro_ko/tamasiro_syo
; @param body_direction right/left/front/back
@set_chara chara="sekiseki" body_direction="right"
@set_chara chara="rutubo" body_direction="right"

;; 変数保存は？
;; 


----------------------------------
// min
/*
first.ks
sonomama
*/

/*
frame.ks
*start
[cm]
@clearstack
*gamestart
@jump storage="room.ks"
//*/

/*
room.ks
;;; main
*start
[cm]
[clearfix]

; parameter declaration
[iscript]
  tf.let_itemcnt_sen = 0;
  tf.const_itemcntmax_sen = 10;
  tf.const_getitemunit_sen = 1;
[endscript]

; disp bg
[bg storage="../bgimage/system/room.png" ]

; disp chara
[chara_new  name="tamasiro_sen" storage="chara/tamasiro_sen/normal.png" jname="sen"]

; disp btn
[button  name="role_button"  role="get_item"  graphic="button/buy_bef.png" target="*get_item" x="40" y="40"]

; disp param
[position layer="message0" left=160 top=500 width=100 height=200 page=fore visible=true]
[position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]
@layopt layer=message0 visible=true
#
disp sen cnt:[eval exp="tf.let_itemcnt_sen"]

; Method
*get_item
[get_item]
@jump target=commonFinally

*commonFinally
[s]

; subrootine

; macro
[macro name="get_item"]
  [iscript]
    tf.const_islimit_sen = tf.let_itemcnt_sen + tf.const_getitemunit_sen => tf.const_itemcntmax_sen;
  [endscript]
  [if exp="const_islimit_sen"]
  [else]
    [emb exp="tf.let_itemcnt_sen++"]
  [endif]
[endmacro]




[clearfix]; memory release?
@clearstack; memory release?
; commonFinally end

//*/


---------------------------------------------------------------------

