if ((location.pathname == '/') || (location.pathname == '/tmac')) {
  const socket = io("https://tipmeacoffee.com");
  //const socket = io("http://localhost:5000");
  // client-side
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("tmac", (data) => {
    data.data.forEach((article) => {
      if (!document.getElementById(article._id)) {
        newData = newArticle(article);
        document.getElementsByClassName('inner-card-wrapper')[0].insertAdjacentHTML("beforebegin", newData);
        window.scrollTo(0,document.body.scrollHeight);
      var alert = '';

      alert += '<div class="alert success">'
        alert += '<span class="closebtn">&times;</span>  '
        alert += '<strong>new!</strong>'+article.json.title+''
      alert += '</div>'
      };
    })
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
}
document.getElementsByClassName('inner-card-wrapper');
function newArticle(article) {
  let html = '';
  let tags = article.json.tags; 
  let metatags = tags.map(s => '<a href="/tags/'+s+'">#'+s+'</a>').join(' '); 
  var catg=article.json.category;
  var category = catg.charAt(0).toUpperCase() + catg.slice(1);
  let upvotes=JSON.stringify(article.votes); 
  if(article.likes>0){
    postIncome=((article.dist)/1000000).toString()
  }else{
    postIncome=0
  }
  if(article.__promoted) {
   html += '<div class="promoted_sec"><span class="promoted_icon"><svg width="20px" height="20px" viewBox="0 0 30 30"><path d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 13 10 L 13 12 L 18.5625 12 L 9.28125 21.28125 L 10.71875 22.71875 L 20 13.4375 L 20 19 L 22 19 L 22 10 Z" /></svg></span><span class="promoted_title">Promoted</span></div>'
  } 
   html += '<div class="inner-card-wrapper" id="'+article._id+'" style="align-items: center;"><div class="card-userPic-wrapper"><a href="/profile/'+article.author+'">'
    if(article.user){
      html += '<img alt="'+article.author +'" width="100%" height="49px" src="'+article.user.profile.avatar+'" class="home_pro_pic" />'
    }else{
      html += '<img alt="'+article.author+'" width="100%" height="49px" src="/images/user.png" class="home_pro_pic" />'
    }
    html += '</a></div><div class="card-content-wrapper" style="display: flex;justify-content: space-between;align-items: center;">'

    if(article.json && article.json.type){
      var hashregex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
      var content=article.json.body;
      var ptags = content.match(hashregex);
      if(ptags){
        for(var i = 0, l = ptags.length; i < l; i++ ){
          content=content.replace(ptags[i], '<a style="color:rgb(0 43 255)" href="/tags/'+ptags[i].replace(/#/g, '').toLowerCase()+'">'+ptags[i]+'</a>');
        };
      };
      if(article.json.type==3){
        html += '<div class="post-content" data-permlink="'+article.link +'" data-author="'+article.author +'"  onclick="window.location.href=\'/post/'+article.author +'/'+article.link+'\'"><p>'+content +'</p></div>'
      }else if(article.json.type==2){
        html += '<div class="post-content" data-permlink="'+article.link +'" data-author="'+article.author +'"><p>'+content +'</p></div><div class="card-content-images"><a href="/post/'+article.author +'/'+article.link +'"><div class="card-image-link"><img alt="'+article.link +'" src="'+article.json.image +'" style="" /></div></a></div>'
      }else if(article.json.type==1){
      html += '<div>'
        html += '<span class="card-content-info card_home_title">'
          html += '<a href="/post/'+article.author +'/'+article.link +'">'+article.json.title +'</a>'
        html += '</span>'
        html += '<span class="card-content-info card_home_tags">'+metatags.toString() +'</span>'
      html += '</div>'
      html += '<div>'
        html += '<span class="card-content-images"><a href="/post/'+article.author +'/'+article.link +'">'
        html += '<span class="card-image-link"><iframe width="170px" height="100px" style="border: none;border-radius: 14px;min-height: 100px;" src="https://youtube.com/embed/'+article.json.videoid+'?mute=1"></iframe></span></a></span>'
      html += '</div>'
      }else if(article.json.type==0){ 
        if(!article.json.image || article.json.image === undefined){
          var iimg='/images/img-tmac.png';
        }else{
          var iimg=article.json.image;
        };
      html += '<span>'
        html += '<div class="card-content-info card_home_title"><a href="/post/'+article.author +'/'+article.link +'">'+article.json.title +'</a></div>'
        html += '<div class="card-content-info">'+article.json.body +'</div>'
        html += '<div class="card-content-info card_home_tags">'+metatags.toString() +'</div>'
      html += '</span>'
      html += '<span>'
        html += '<div class="card-content-images"><a href="/post/'+article.author +'/'+article.link +'"><div class="card-image-link" ><img alt="'+article.link +'" src="'+iimg +'" style="" /></div></a></div>'
      html += '</span>'
      }
    }else{
      html += '<div class="card-content-info card_home_title"><a href="/post/'+article.author +'/'+article.link +'">'+article.json.title +'</a></div>'
      html += '<div class="card-content-info card_home_tags">'+metatags.toString() +'</div>'
      html += '<div class="card-content-images"><a href="/post/'+article.author +'/'+article.link +'"><div class="card-image-link"><img alt="'+article.link +'" src="'+article.json.image +'" /></div></a></div>'
    }
     html += '</div>'
   html += '</div>'

return html

} 