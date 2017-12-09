��f u n c t i o n     p r i n t O u t ( )   {  
     v a r   a p p   =   n e w   P I X I . A p p l i c a t i o n ( 1 9 2 0 , 1 0 8 0 ,   { b a c k g r o u n d C o l o r :   0 x 1 0 9 9 b b } ) ;  
     d o c u m e n t . b o d y . a p p e n d C h i l d ( a p p . v i e w ) ;    
    
     v a r   s t y l e   =   n e w   P I X I . T e x t S t y l e ( {  
     f o n t F a m i l y :   ' C o n s o l a s ' ,  
     f o n t S i z e :   8 0 ,  
     f i l l :   [ ' # f f f f f f ' ,   ' # 0 0 f f 9 9 ' ] ,   / /   g r a d i e n t  
     s t r o k e :   ' # 4 a 1 8 5 0 ' ,  
     s t r o k e T h i c k n e s s :   5 ,  
     d r o p S h a d o w :   t r u e ,  
     d r o p S h a d o w C o l o r :   ' # 0 0 0 0 0 0 ' ,  
     d r o p S h a d o w B l u r :   4 ,  
     d r o p S h a d o w A n g l e :   M a t h . P I   /   6 ,  
     d r o p S h a d o w D i s t a n c e :   6 ,  
     w o r d W r a p :   t r u e ,  
     w o r d W r a p W i d t h :   4 4 0  
     } ) ;  
  
     v a r   i n p u t T x t   =   d o c u m e n t . g e t E l e m e n t s B y C l a s s N a m e ( ' g a m e T i p ' ) ;    
     v a r   n u m b e r =   M a t h . f l o o r ( M a t h . r a n d o m ( )   *   1 0 ) ;  
     v a r   r i c h T e x t   =   n e w   P I X I . T e x t ( i n p u t T x t [ n u m b e r ] . i n n e r H T M L , s t y l e ) ;  
     r i c h T e x t . a n c h o r . s e t ( 0 . 5 ) ;  
     r i c h T e x t . x   =   1 9 2 0 / 2 ;  
     r i c h T e x t . y   =   1 0 8 0 / 2 ;  
     a p p . s t a g e . a d d C h i l d ( r i c h T e x t ) ;  
      
     v a r   b a r 1   =   n e w   P I X I . G r a p h i c s ( ) ;  
     b a r 1 . l i n e S t y l e ( 2 , 0 x F F F F F F , 1 ) ;  
     b a r 1 . d r a w R e c t ( 1 9 2 0 / 2 - 3 0 0 , 8 5 0 , 6 0 0 , 5 0 ) ;  
     a p p . s t a g e . a d d C h i l d ( b a r 1 ) ;  
      
     v a r   g r a p h i c s   =   n e w   P I X I . G r a p h i c s ( ) ;  
     g r a p h i c s . l i n e S t y l e ( 2 ,   0 x F F 0 0 F F ,   1 ) ;  
     g r a p h i c s . b e g i n F i l l ( 0 x F F 0 0 B B ,   0 . 2 5 ) ;  
     g r a p h i c s . d r a w R e c t ( 1 9 2 0 / 2 - 3 0 0 ,   8 5 0 ,   0 ,   5 0 ) ;  
     a p p . s t a g e . a d d C h i l d ( g r a p h i c s ) ;  
  
     v a r   a = 0 ;  
     a p p . t i c k e r . a d d ( f u n c t i o n ( d e l t a )   {          
             a + = d e l t a ;  
             g r a p h i c s . d r a w R e c t ( 1 9 2 0 / 2 - 3 0 0 ,   8 5 0 ,   a ,   5 0 ) ;  
             i f ( a > 6 0 0 )  
             {  
                 a = 6 0 0 ;  
             }        
 } ) ;  
  
 }  
  
  
 / *  
   t h i s . a s s e t s   =   [ G l o b a l . p a t h I m a g e s   +   " u i . j s o n "   ,   G l o b a l . p a t h I m a g e s   +   " a n i m a t i o n s . j s o n " ] ;  
         t h i s . l o a d e r   =   n e w   P I X I . A s s e t L o a d e r ( t h i s . a s s e t s ) ;  
         t h i s . l o a d e r . a d d E v e n t L i s t e n e r ( " o n P r o g r e s s " ,   f u n c t i o n   ( e )   {  
                 v a r   p e r c e n t   =   1   -   ( e . c o n t e n t . l o a d C o u n t   /   e . c o n t e n t . a s s e t U R L s . l e n g t h ) ;  
                 / / h e r e   j u s t   g i v e s   m e   t w o   v a l u e s     [ 0 . 5   a n d   1 ]  
                 c o n s o l e . l o g ( p e r c e n t ) ;  
         } ) ;  
 * /  
  
  
 / *  
     l e t   v e l o c i t y = 1 ;  
     a p p . t i c k e r . a d d ( ( ) = >  
     {  
         g r a p h i c s . x   + =   v e l o c i t y ;  
     } ) ; * /  
 / / g r a p h i c s . w i d t h = 8 0 0 ;  
   / / g r a p h i c s . w i d t h + = 1 * d e l t a ;  
         / / g r a p h i c s . r o t a t i o n   + =   0 . 1   *   d e l t a ;  
         / / g r a p h i c s . p i v o t . s e t ( 1 9 2 0 / 2 , 9 5 0 ) ;  
 / *  
 l e t   c r a y l e n g t h   =   6 0 0 ;  
     c o n s t   t i c k e r   =   n e w   P I X I . t i c k e r . T i c k e r ( ) ;  
 t i c k e r . s t o p ( ) ;  
 t i c k e r . a d d ( ( d e l t a T i m e )   = >   {  
     c r a y l e n g t h + = 1 ;  
     g r a p h i c s . d r a w R o u n d e d R e c t ( 1 9 2 0 / 2 - 3 0 0 , 9 0 0 ,     c r a y l e n g t h , 1 0 0 , 1 0 )  
     / / g r a p h i c s . x + = 0 . 1 * d e l t a T i m e ;  
     / / g r a p h i c s . r o t a t i o n   + =   0 . 1   *   d e l t a T i m e ;  
     / / g r a p h i c s . p i v o t . s e t ( 1 9 2 0 / 2 , 9 5 0 ) ;  
 } ) ;  
 t i c k e r . s t a r t ( ) ;  
 * /  
  
 / *  
  
 d a t a = {  
     / / g a m e O b j e c t  
     t e x t = ' t h i s i s l o a d i n g b a r ' ,  
     p o s X = 1 0 0 ,  
     p o s Y = 1 0 0  
 }  
   f u n c t i o n   B a l a n c e B o a r d ( d a t a )   {  
         t h i s . g a m e O b j e c t   =   d a t a [ ' g a m e O b j e c t ' ] ;  
         t h i s . t e x t   =   d a t a [ ' t e x t ' ] ;  
         t h i s . p o s X   =   d a t a [ ' p o s X ' ] ;  
         t h i s . p o s Y   =   d a t a [ ' p o s Y ' ] ;  
  
         t h i s . s p r i t e T e x t ;  
  
         t h i s . s p r i t e B o r d e r   =   {  
                 ' f r a m e i n d e x ' :   0 ,  
                 f r a m e s :   [  
                         ' s t a t s - b o r d e r - 1 . p n g '  
                 ]  
         } ;  
  
         t h i s . s p r i t e B a r   =   {  
                 ' f r a m e i n d e x ' :   0 ,  
                 f r a m e s :   [  
                         ' s t a t s - b a r - 1 . p n g '  
                 ]  
         } ;  
 }  
  
  
 B a l a n c e B o a r d . p r o t o t y p e . b u i l d   =   f u n c t i o n ( )   {  
         t h i s . s p r i t e B o r d e r [ ' t e x t u r e ' ]   =   P I X I . T e x t u r e . f r o m F r a m e ( t h i s . s p r i t e B o r d e r [ ' f r a m e s ' ] [ 0 ] ) ;  
         t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ]   =   n e w   P I X I . S p r i t e ( t h i s . s p r i t e B o r d e r [ ' t e x t u r e ' ] ) ;  
         t h i s . s p r i t e B o r d e r [ ' f r a m e i n d e x ' ]   =   0 ;  
         t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . a n c h o r . x   =   0 . 5 ;  
         t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . a n c h o r . y   =   0 . 5 ;  
  
         t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . p o s i t i o n . x   =   - t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . w i d t h ;  
         t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . p o s i t i o n . y   =   - t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . h e i g h t ;  
         g a m e O b j e c t . g e t S t a g e ( ) . a d d C h i l d ( t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] ) ;  
  
         t h i s . s p r i t e B a r [ ' t e x t u r e ' ]   =   P I X I . T e x t u r e . f r o m F r a m e ( t h i s . s p r i t e B a r [ ' f r a m e s ' ] [ 0 ] ) ;  
         t h i s . s p r i t e B a r [ ' o b j e c t ' ]   =   n e w   P I X I . S p r i t e ( t h i s . s p r i t e B a r [ ' t e x t u r e ' ] ) ;  
         t h i s . s p r i t e B a r [ ' f r a m e i n d e x ' ]   =   0 ;  
         t h i s . s p r i t e B a r [ ' o b j e c t ' ] . a n c h o r . x   =   0 . 5 ;  
         t h i s . s p r i t e B a r [ ' o b j e c t ' ] . a n c h o r . y   =   0 . 5 ;  
  
  
         t h i s . s p r i t e B a r [ ' o b j e c t ' ] . p o s i t i o n . x   =   - t h i s . s p r i t e B a r [ ' o b j e c t ' ] . w i d t h ;  
         t h i s . s p r i t e B a r [ ' o b j e c t ' ] . p o s i t i o n . y   =   - t h i s . s p r i t e B a r [ ' o b j e c t ' ] . h e i g h t ;  
         g a m e O b j e c t . g e t S t a g e ( ) . a d d C h i l d ( t h i s . s p r i t e B a r [ ' o b j e c t ' ] ) ;  
  
         t h i s . s p r i t e T e x t   =   n e w   P I X I . T e x t ( t h i s . t e x t ,   {  
                 f o n t :   ' 6 0 0   1 0 p t   O p e n   S a n s ' ,  
                 f i l l :   ' w h i t e '  
         } ) ;  
  
         t h i s . s p r i t e T e x t . p o s i t i o n . x   =   t h i s . g e t P o s X ( )   -   t h i s . s p r i t e T e x t . w i d t h   /   2 ;  
         t h i s . s p r i t e T e x t . p o s i t i o n . y   =   t h i s . g e t P o s Y ( )   -   t h i s . s p r i t e T e x t . h e i g h t   /   2 ;  
  
         g a m e O b j e c t . g e t S t a g e ( ) . a d d C h i l d ( t h i s . s p r i t e T e x t ) ;  
 } ;  
  
 B a l a n c e B o a r d . p r o t o t y p e . u p d a t e   =   f u n c t i o n ( )   {  
         t h i s . s p r i t e T e x t . t e x t   =   t h i s . t e x t ;  
  
         t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . p o s i t i o n . x   =   t h i s . g e t P o s X ( ) ;  
         t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . p o s i t i o n . y   =   t h i s . g e t P o s Y ( ) ;  
  
         t h i s . s p r i t e B a r [ ' o b j e c t ' ] . p o s i t i o n . x   =   t h i s . g e t P o s X ( ) ;  
         t h i s . s p r i t e B a r [ ' o b j e c t ' ] . p o s i t i o n . y   =   t h i s . g e t P o s Y ( ) ;  
  
         t h i s . s p r i t e T e x t . p o s i t i o n . x   =   t h i s . g e t P o s X ( )   -   t h i s . s p r i t e T e x t . w i d t h   /   2 ;  
         t h i s . s p r i t e T e x t . p o s i t i o n . y   =   t h i s . g e t P o s Y ( )   -   t h i s . s p r i t e T e x t . h e i g h t   /   2 ;  
 } ;  
  
 B a l a n c e B o a r d . p r o t o t y p e . g e t P o s X   =   f u n c t i o n ( )   {  
         r e t u r n   t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . w i d t h   /   2   +   t h i s . p o s X ;  
 } ;  
  
 B a l a n c e B o a r d . p r o t o t y p e . g e t P o s Y   =   f u n c t i o n ( )   {  
         r e t u r n   t h i s . s p r i t e B o r d e r [ ' o b j e c t ' ] . h e i g h t   /   2   +   t h i s . p o s Y ;  
 } ;  
  
 P I X I . l o a d e r  
     . a d d ( [  
         " a n g . p n g " ,  
         " s i b a l . p n g "  
     ] )  
     . o n ( " p r o g r e s s " ,   l o a d P r o g r e s s H a n d l e r )  
     . l o a d ( s e t u p ) ;  
  
 f u n c t i o n   l o a d P r o g r e s s H a n d l e r ( l o a d e r ,   r e s o u r c e )   {  
  
     / / D i s p l a y   t h e   f i l e   ` u r l `   c u r r e n t l y   b e i n g   l o a d e d  
     c o n s o l e . l o g ( " l o a d i n g :   "   +   r e s o u r c e . u r l ) ;    
  
     / / D i s p l a y   t h e   p r e c e n t a g e   o f   f i l e s   c u r r e n t l y   l o a d e d  
     c o n s o l e . l o g ( " p r o g r e s s :   "   +   l o a d e r . p r o g r e s s   +   " % " ) ;    
  
     / / I f   y o u   g a v e   y o u r   f i l e s   n a m e s   a s   t h e   f i r s t   a r g u m e n t    
     / / o f   t h e   ` a d d `   m e t h o d ,   y o u   c a n   a c c e s s   t h e m   l i k e   t h i s  
     / / c o n s o l e . l o g ( " l o a d i n g :   "   +   r e s o u r c e . n a m e ) ;  
 }  
  
 f u n c t i o n   s e t u p ( )   {  
     c o n s o l e . l o g ( " A l l   f i l e s   l o a d e d " ) ;  
 }  
 * / 
