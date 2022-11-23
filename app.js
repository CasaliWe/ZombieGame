//Banco de Dados
const firebaseConfig = {
    apiKey: "AIzaSyB0Nlvpr4zt0FNDPde_aZRLM4iQ5Bp_J00",
    authDomain: "game-zombie-7c266.firebaseapp.com",
    projectId: "game-zombie-7c266",
    storageBucket: "game-zombie-7c266.appspot.com",
    messagingSenderId: "764988460986",
    appId: "1:764988460986:web:6f2127db3fc833d21bd783"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


//-------------------------------------------------------------------------------------------------------



//Inicio LOGIN Pegar dados banco
function index(){
             


            //RANK ORDENADO ABAIXO NA INDEX----------------------------------------------           
            var rankk = []

            db.collection('users').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                       rankk.push({jogador:doc.data().nome, pontuacao: doc.data().pontos})
                });
            })


            setTimeout(() => {
                   var tabelaRankk = document.getElementById('tabelaMelhores')
                   tabelaRankk.innerHTML = `<h4>Melhores jogadores</h4>`
    
    
                    setTimeout(() => {
                        rankk.sort(function(a,b){
                             if(a.pontuacao > b.pontuacao){
                                   return -1
                             } else { 
                                   return true
                             }
                        })
    
                    }, 300);
                
    
                    setTimeout(() => {
                        rankk.forEach((valor, indice)=>{
                            tabelaRankk.innerHTML += `<p>${indice +1}º ${valor.jogador} - ${valor.pontuacao} Kills</p>`
                        })
                    }, 300); 
            
            }, 1000);   
            //RANK ORDENADO ACIMA NA INDEX----------------------------------------------


       
       if(JSON.parse(localStorage.getItem('login'))){

              var login = JSON.parse(localStorage.getItem('login'))

              db.collection('users').get().then(snapshot => {
                  snapshot.docs.forEach(doc => {
                      if(doc.data().nome == login.nome && doc.data().senha == login.senha){
                          //LOGADO000000000000000000000000000000000000000000000000000000000000000000
                          window.location.href = 'inicio.html'
                      }
                  });
              })
       }
    
}







//LOGAR
function logar(){
        var pessoaLogin = {nome: document.getElementById('user').value, senha:document.getElementById('password').value}

        db.collection('users').get().then(snapshot => {
              snapshot.docs.forEach(doc => {
                      if(doc.data().nome == pessoaLogin.nome && doc.data().senha == pessoaLogin.senha){
                            //LOGADO00000000000000000000000000000000000000000000000000000000000
                            localStorage.setItem('login', JSON.stringify(pessoaLogin))
                            clearTimeout(logando)
                            window.location.href = 'inicio.html'
                      }
              });
        })

        var logando = setTimeout(() => {
               alert('Erro, verifique os dados!!!')
        }, 2000);
}






//Processos de criação de conta final
function contaCriada(){
        var user = {nome:document.getElementById('criaUser').value, senha:document.getElementById('criaSenha').value, pontos: 0}
         
        //Verificar se user existe
        db.collection('users').get().then(snapshot => {
              snapshot.docs.forEach(doc => {
                      if(doc.data().nome == user.nome){
                             alert('Usuário já existe!!!')
                             clearTimeout(gravarUser)
                      }
              });
        })

        
        //Gravar no banco e no localStorage
        var gravarUser = setTimeout(() => {
            db.collection('users').doc(`${user.nome}`).set(user)
            .then(()=>{
              
            })
            .catch(()=>{
                
            })

            localStorage.setItem('login', JSON.stringify(user))

            document.getElementById('blocoCriarConta').style.display = 'none'

            primeiroLogin();
        }, 2000);

}


//Primeiro login
function primeiroLogin(){
         var login = JSON.parse(localStorage.getItem('login'))
         document.getElementById('user').value = login.nome
         document.getElementById('password').value = login.senha
}








//CRIAR CONTA
function criarConta(){
    document.getElementById('blocoCriarConta').style.display = 'flex'
}

//Fechar aba criar conta caso não queira criar conta
function fechaAba(){
        document.getElementById('blocoCriarConta').style.display = 'none'
}












//-----------------------------PÁGINA INICAL--------------------------------
function inicio(){


                    //Inicar música TWD
                    const twd = new Audio()
                    twd.src = "song/twd.mp3"
                    twd.play()


                    if(JSON.parse(localStorage.getItem('login'))){
                        var login = JSON.parse(localStorage.getItem('login'))
                        document.getElementById('nomeJogadorInicio').textContent = login.nome
                    } else {
                        window.location.href = 'index.html'
                    }



                //RANK ORDENADO ABAIXO NA INDEX----------------------------------------------           
                var rankk = []

                db.collection('users').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                           rankk.push({jogador:doc.data().nome, pontuacao: doc.data().pontos})
                    });
                })
    
    
                setTimeout(() => {
                       var tabelaRankk = document.getElementById('pag2')

                        setTimeout(() => {
                            rankk.sort(function(a,b){
                                 if(a.pontuacao > b.pontuacao){
                                       return -1
                                 } else { 
                                       return true
                                 }
                            })
        
                        }, 300);
                    
        
                        setTimeout(() => {
                            rankk.forEach((valor, indice)=>{
                                tabelaRankk.innerHTML += `<p>${indice +1}º ${valor.jogador} - ${valor.pontuacao} Kills</p>`
                                if(JSON.parse(localStorage.getItem('login')).nome == valor.jogador){
                                       document.getElementById('posJogadorInicio').innerHTML = `${indice +1}º Lugar`
                                }
                            })
                        }, 300); 
                
                }, 1000);   

                //RANK ORDENADO ACIMA NA INDEX----------------------------------------------



                //SELECIONANDO PERSONAGEM ---------------------
                const homer = new Audio()
                homer.src = "song/risadaHomer.mp3"
                const we = new Audio()
                we.src = "song/we.mp3"
                const monica = new Audio()
                monica.src = "song/monica.mp3"


                var personagemEscolhido = 1

                document.getElementById('btnMudarPerso').addEventListener('click', ()=>{
                        var perso = document.getElementById('selectPerso')

                        
                        if(perso.src.indexOf('perso') > -1){
                                perso.src = 'img/homer.gif'
                                perso.style.cssText = 'width: 120px'
                                personagemEscolhido = 2
                                monica.pause()
                                we.pause()
                                homer.play()
                        } else if(perso.src.indexOf('homer') > -1){
                                perso.src = 'img/monica.gif'
                                perso.style.cssText = 'width: 150px'
                                personagemEscolhido = 3
                                monica.play()
                                we.pause()
                                homer.pause()
                        } else {
                                perso.src = 'img/perso.gif'
                                perso.style.cssText = 'width: 150px'
                                personagemEscolhido = 1
                                monica.pause()
                                we.play()
                                homer.pause()
                        }

                })

                document.getElementById('btnInicarJogo').addEventListener('click', ()=>{
                       window.location.href = 'app.html?'+ personagemEscolhido
                })
         
 

}
















//------------------------------Inicio App----------------------------------------------


//Variaveis
var personagem = document.getElementById('personagem')
var posicao = 0
var pai = document.getElementById('palco')
var tempoTiro = 0
var vida = 100
var tempoCriaZombie = 800
var pontosAjuda = 0
var tempoAjudaRegress = 15
var killsTotal = 0
var tempoCriaVida = 10000
var tempoCriaCarro = 7000
var loginn = JSON.parse(localStorage.getItem('login'))
var contagemRegress = 3




//Songs
const zombie = new Audio()
zombie.src = "song/zombie.mp3"
const tiro = new Audio()
tiro.src = "song/bang.mp3"
const ajudaa = new Audio()
ajudaa.src = "song/ajuda.mp3"
const aoo = new Audio()
aoo.src = "song/aoo.mp3"
const buzina = new Audio()
buzina.src = "song/buzina.mp3"
const double = new Audio()
double.src = "song/double.mp3"
const triple = new Audio()
triple.src = "song/triple.mp3"
const ultra = new Audio()
ultra.src = "song/ultra.mp3"
const gameover = new Audio()
gameover.src = "song/gameover.mp3"
const perdeu = new Audio()
perdeu.src = "song/perdeu.mp3"
const btn = new Audio()
btn.src = "song/btn.mp3"
const core = new Audio()
core.src = "song/core.mp3"
const regresss = new Audio()
regresss.src = "song/regress.mp3"
const tropelo = new Audio()
tropelo.src = "song/tropelo.mp3"
const help = new Audio()
help.src = "song/semVida.mp3"






//CONTAGEM 3 SEGUNDOS INICIAL
function regress(){
    
    var persoEscolhido = window.location.search
    persoEscolhido = persoEscolhido.replace('?', '')
    if(persoEscolhido == '1'){
            document.getElementById('personagem').src = 'img/perso.gif'
    } else if(persoEscolhido == '2'){
            document.getElementById('personagem').src = 'img/homer.gif'
    } else {
            document.getElementById('personagem').src = 'img/monica.gif'
    }






    var regress = setInterval(() => {
          if(contagemRegress == 0){
                document.getElementById('regress').textContent = ''
                inicarGame();
                clearInterval(regress)
                zombie.play()
          } else{
                document.getElementById('regress').textContent = contagemRegress
                contagemRegress--
                regresss.play()
          }
    }, 1000);
}




//Mostrar nome do jogador
document.getElementById('nomeNoJogo').innerHTML = `Jogador: <span style="color: orangered;">${loginn.nome}</span>`





//BTN PARA DEIXAR PARTIDA
function sairDoJogo(){
        window.location.href = 'inicio.html'
}

//BTN PARA SAIR DA CONTA    
function sairDaConta(){
    localStorage.removeItem('login')
    window.location.href = 'index.html'
}




//Subir e descer
function subir(){
      posicao = posicao - 30
      if(posicao < 0){
            posicao = 0
      }
      personagem.style.cssText = `top: ${posicao}px;`
}

function descer(){
       posicao = posicao + 30
       if(posicao > 300){
             posicao = 300
       }
       personagem.style.cssText = `top: ${posicao}px;`
}






//Atirar
function atirar(){


        var persoEscolhido = window.location.search
        persoEscolhido = persoEscolhido.replace('?', '')
        if(persoEscolhido == '1'){
                document.getElementById('personagem').src = 'img/perso.gif'
        } else if(persoEscolhido == '2'){
                document.getElementById('personagem').src = 'img/homer.gif'
        } else {
                document.getElementById('personagem').src = 'img/monica.gif'
        }



         tempoTiro++
         if(tempoTiro == 1){
        
                
         document.getElementById('atirar').style.cssText = ` transform: rotate(-30deg);`
         setTimeout(() => {
             document.getElementById('atirar').style.cssText = ` transform: rotate(0deg);`
         }, 200);

         var posisaoBala = posicao

         if(posisaoBala == 0){
            posisaoBala = 40
         } else {
            posisaoBala = posisaoBala + 40
         }

         var bala = document.createElement('div')

         if(persoEscolhido == '1'){
            bala.style.cssText = `
            width: 20px;
            border-radius: 2px;
            height: 5px;
            background-color: green;
            position: absolute;
            top: ${posisaoBala}px;
            left: 130px;
            `
            tiro.play()
         } else if(persoEscolhido == '2'){
            bala.style.cssText = `
            width: 20px;
            border-radius: 15px;
            height: 20px;
            background-color: #F4D128;
            position: absolute;
            top: ${posisaoBala}px;
            left: 130px;
            `
            tiro.play()
         } else {
            bala.style.cssText = `
            width: 25px;
            border-radius: 15px;
            height: 20px;
            background-color: #72C2F0;
            position: absolute;
            top: ${posisaoBala}px;
            left: 130px;
            `
            tiro.play()
         }


         bala.classList.add('balaAnima')
         pai.appendChild(bala)

         
         //Verificar se acertou o tiro
         var zombies0 = document.querySelectorAll('.animaZombie0')
         var zombies1 = document.querySelectorAll('.animaZombie1')
         var zombies2 = document.querySelectorAll('.animaZombie2')
         var novaVidaTiro = document.querySelectorAll('.animaVida')
         var kills = 0

         //ZOMBIE 0 -------------------------------------------------------
         zombies0.forEach((valor)=>{
                if(valor.offsetTop == posicao){
                        setTimeout(() => {
                            valor.src = 'img/sangue.png'
                            aoo.play()
                            kills = kills +1
                            attTotalKills();
                            bala.remove()
                            ajuda();
                        }, 500);

                        setTimeout(() => {
                            valor.remove()
                        }, 1000);
                } 

                if(valor.offsetTop - posicao == -30){
                    setTimeout(() => {
                        valor.src = 'img/sangue.png'
                        aoo.play()
                        kills = kills +1
                        attTotalKills();
                        bala.remove()
                        ajuda();
                    }, 500);

                    setTimeout(() => {
                        valor.remove()
                    }, 1000);
                } 

         })

         //ZOMBIE 1 -------------------------------------------------------
         zombies1.forEach((valor)=>{
              if(valor.offsetTop == posicao){
                    setTimeout(() => {
                        valor.src = 'img/sangue.png'
                        aoo.play()
                        kills = kills +1
                        attTotalKills();
                        bala.remove()
                        ajuda();
                    }, 500);

                    setTimeout(() => {
                        valor.remove()
                    }, 1000);
              } 

              if(valor.offsetTop - posicao == -30){
                    setTimeout(() => {
                       valor.src = 'img/sangue.png'
                       aoo.play()
                       kills = kills +1
                       attTotalKills();
                       bala.remove()
                       ajuda();
                    }, 500);
 
                       setTimeout(() => {
                       valor.remove()
                    }, 1000);
              } 

         })

         //ZOMBIE 2 -------------------------------------------------------
         zombies2.forEach((valor)=>{
              if(valor.offsetTop == posicao){
                    setTimeout(() => {
                        valor.src = 'img/sangue.png'
                        aoo.play()
                        kills = kills +1
                        attTotalKills();
                        bala.remove()
                        ajuda();
                    }, 500);

                    setTimeout(() => {
                        valor.remove()
                    }, 1000);
              } 

              if(valor.offsetTop - posicao == -30){
                    setTimeout(() => {
                        valor.src = 'img/sangue.png'
                        aoo.play()
                        kills = kills +1
                        attTotalKills();
                        bala.remove()
                        ajuda();
                    }, 500);

                    setTimeout(() => {
                       valor.remove()
                    }, 1000);
              } 

         })

        //VIDA EXTRA -------------------------------------------------------
         novaVidaTiro.forEach((valor)=>{
             if(valor.offsetTop == posicao){
                    setTimeout(() => {
                          
                             if(valor.id == ''){
                                    valor.id = '1'
                                    valor.src = 'img/preto.png'
                             } else if(valor.id == '1'){
                                   valor.remove()
                                   core.play()
                                   vida = 100
                                   document.getElementById('diminuiVida').style.width = `${vida}%`
                             }
               
                    }, 500);
             }
         })




         setTimeout(() => {
                 bala.remove()
                 tempoTiro = 0
                 killsContagem(kills);
                 kills = 0
         }, 600);
        }
}





//CONTAGEM DE KILLS
function killsContagem(k){
        if(k == 2){
            document.getElementById('kills').textContent = 'Double Kill'
            double.play()
            setTimeout(() => {
                document.getElementById('kills').textContent = ''
            }, 700);
        } else if(k == 3){
            document.getElementById('kills').textContent = 'Triple Kill'
            triple.play()
            setTimeout(() => {
                document.getElementById('kills').textContent = ''
            }, 700);
        } else if(k == 4){
            document.getElementById('kills').textContent = 'Ultra kill!'
            ultra.play()
            setTimeout(() => {
                document.getElementById('kills').textContent = ''
            }, 1000);
        }
}




function sumirVida(){
    var verificarVidaEmCampo = setInterval(() => {
         var vidaEmCampo = document.querySelectorAll('.animaVida')
         vidaEmCampo.forEach((valor)=>{
                    if(valor.offsetLeft <= 0){
                            valor.remove()
                            clearInterval(verificarVidaEmCampo)
                    }
         })
    }, 50);
}





//INICAR GAME
function inicarGame(){


//Criar ZOMBIES
setInterval(() => {
        var randomZombie = Math.floor(Math.random() * 2)
        var randomPosZombie = [0,30,60,90,120,150,180,210,240,270,300]
        var randomPosZombie2 = Math.floor(Math.random() * 11)
        var velo = Math.floor(Math.random() * 3)


         var zombie = document.createElement('img')
         zombie.src = `img/zombie${randomZombie +1}.gif`
         zombie.style.cssText = `top: ${randomPosZombie[randomPosZombie2]}px; width: 100px; position: absolute;`
         zombie.classList.add(`animaZombie${velo}`) 
         pai.appendChild(zombie)
}, tempoCriaZombie);




//Ganhar Vida matando o coração
setInterval(() => {

    var vidaRandom = Math.floor(Math.random() * 3)
    var randomPosVida = [0,30,60,90,120,150,180,210,240,270,300]
    var randomPosVida2 = Math.floor(Math.random() * 11)
    if(vidaRandom == 1){
             var novaVida = document.createElement('img')
             novaVida.src = 'img/life.png'
             novaVida.style.cssText= `top: ${randomPosVida[randomPosVida2]}px; width: 60px; position: absolute;`
             novaVida.classList.add('animaVida')
             pai.appendChild(novaVida)
             sumirVida();
    }

}, tempoCriaVida);




//CARRO PASSANDOOOOOOOOOOOOOOO
var paraCarro = setInterval(() => {
      var carroRandom = Math.floor(Math.random() * 2 )
      var randomPosCarro = [0,200]
      var randomPosCarro2 = Math.floor(Math.random() * 2)
      if(carroRandom == 1){
               var novoCarro = document.createElement('img')
               novoCarro.src = 'img/carro.png'
               buzina.play()
               novoCarro.style.cssText= `top: ${randomPosCarro[randomPosCarro2]}px; width: 260px; position: absolute;`
               novoCarro.classList.add('animaCarro')
               pai.appendChild(novoCarro)
               sumirCarro();
               carroZombie();
      }
}, tempoCriaCarro);


}//FIM INICAR GAME





function sumirCarro(){
        verificarCarroEmJogo = setInterval(() => {
            carroEmJogo = document.querySelectorAll('.animaCarro')
            carroEmJogo.forEach((valor)=>{
                        if(valor.offsetLeft <= 130 && valor.style.top == '0px' && posicao == 30){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                      gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '0px' && posicao == 60){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                       gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '0px' && posicao == 90){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                       gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '0px' && posicao == 120){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                      gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '0px' && posicao == 150){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                    gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '200px' && posicao == 300){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                     gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '200px' && posicao == 270){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                     gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '200px' && posicao == 240){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                     gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= 130 && valor.style.top == '200px' && posicao == 210){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                                personagem.src = 'img/sangue.png'
                                tropelo.play()
                                setTimeout(() => {
                                     gameOver()//-----------PERDEU ATROPELADO------------
                                }, 1000);
                        } else if(valor.offsetLeft <= -50){
                                valor.remove()
                                clearInterval(verificarCarroEmJogo)
                        }
            })
        }, 50);
}


function carroZombie(){
              zombieSaiDaFrente0 = document.querySelectorAll('.animaZombie0')
              zombieSaiDaFrente1 = document.querySelectorAll('.animaZombie1')
              zombieSaiDaFrente2 = document.querySelectorAll('.animaZombie2')

              var carro1 = document.querySelector('.animaCarro')

        
        if(carro1.style.top == '0px'){

              zombieSaiDaFrente0.forEach((valor)=>{
                          setTimeout(() => {
                               if(valor.style.top == '30px' || valor.style.top == '60px' || valor.style.top == '90px' || valor.style.top == '120px' || valor.style.top == '150px'){
                                    valor.src = 'img/sangue.png'
                                    setTimeout(() => {
                                         valor.remove()
                                    }, 500);
                               }
                          }, 800);
              })

              zombieSaiDaFrente1.forEach((valor)=>{
                       setTimeout(() => {
                          if(valor.style.top == '30px' || valor.style.top == '60px' || valor.style.top == '90px' || valor.style.top == '120px' || valor.style.top == '150px'){
                               valor.src = 'img/sangue.png'
                               setTimeout(() => {
                                    valor.remove()
                               }, 500);
                          }
                       }, 800);
             })

             zombieSaiDaFrente2.forEach((valor)=>{
                      setTimeout(() => {
                          if(valor.style.top == '30px' || valor.style.top == '60px' || valor.style.top == '90px' || valor.style.top == '120px' || valor.style.top == '150px'){
                              valor.src = 'img/sangue.png'
                              setTimeout(() => {
                                    valor.remove()
                              }, 500);
                          }
                      }, 800);
             })

        } else if(carro1.style.top == '200px'){

            zombieSaiDaFrente0.forEach((valor)=>{
                        setTimeout(() => {
                             if(valor.style.top == '300px' || valor.style.top == '270px' || valor.style.top == '240px' || valor.style.top == '210px' || valor.style.top == '180px'){
                                  valor.src = 'img/sangue.png'
                                  setTimeout(() => {
                                       valor.remove()
                                  }, 500);
                             }
                        }, 800);
            })

            zombieSaiDaFrente1.forEach((valor)=>{
                     setTimeout(() => {
                        if(valor.style.top == '300px' || valor.style.top == '270px' || valor.style.top == '240px' || valor.style.top == '210px' || valor.style.top == '180px'){
                             valor.src = 'img/sangue.png'
                             setTimeout(() => {
                                  valor.remove()
                             }, 500);
                        }
                     }, 800);
           })

           zombieSaiDaFrente2.forEach((valor)=>{
                    setTimeout(() => {
                        if(valor.style.top == '300px' || valor.style.top == '270px' || valor.style.top == '240px' || valor.style.top == '210px' || valor.style.top == '180px'){
                            valor.src = 'img/sangue.png'
                            setTimeout(() => {
                                  valor.remove()
                            }, 500);
                        }
                    }, 800);
           })

        }
}












//Verificar perda de vida e remover ZOMBIE
function verificarDerrota(){
           setInterval(() => {
                 var zombiesPassado0 = document.querySelectorAll('.animaZombie0')
                 var zombiesPassado1 = document.querySelectorAll('.animaZombie1')
                 var zombiesPassado2 = document.querySelectorAll('.animaZombie2')
                 zombiesPassado0.forEach((valor)=>{
                          if(valor.offsetLeft <= 0){
                                   vida = vida -20
                                   valor.remove()
                                   help.play()
                                   document.getElementById('diminuiVida').style.cssText = `width: ${vida}%;`
                                   if(vida == 0){
                                         setTimeout(() => {
                                              //------------------------------GAME OVER--------------------
                                              gameOver();
                                         }, 750);
                                   }
                          }
                 })

                 zombiesPassado1.forEach((valor)=>{
                        if(valor.offsetLeft <= 0){
                             vida = vida -20
                             valor.remove()
                             help.play()
                             document.getElementById('diminuiVida').style.cssText = `width: ${vida}%;`
                             if(vida == 0){
                                   setTimeout(() => {
                                        //------------------------------GAME OVER--------------------
                                        gameOver();
                                   }, 750);
                             }
                        }
                 })

                 zombiesPassado2.forEach((valor)=>{
                        if(valor.offsetLeft <= 0){
                            vida = vida -20
                            valor.remove()
                            help.play()
                            document.getElementById('diminuiVida').style.cssText = `width: ${vida}%;`
                              if(vida == 0){
                                   setTimeout(() => {
                                       //------------------------------GAME OVER--------------------
                                       gameOver();
                                   }, 750);
                              }
                        }
                 })
           }, 50);
}

verificarDerrota();

 




//Jogar nas teclas do teclado, seta cima, seta abaixo e Enter
document.addEventListener('keydown', (event)=>{
            if(event.key == 'ArrowUp'){
                subir();
            } else if(event.key == 'ArrowDown'){
                descer();
            } else if(event.key == 'Enter' || event.key == 'ArrowRight'){
                atirar();
            } else if(event.key == 'ArrowLeft' ){
                    if(document.querySelector('#btnAjuda > button').style.display== 'block'){
                           chamarAjuda();
                    }
            }
})









//AJUDA
function ajuda(){
         pontosAjuda = pontosAjuda + 10
         if(pontosAjuda >= 100){
               pontosAjuda = 100
               criarBtnAjuda();
         }
         document.getElementById('pontosAjuda').style.cssText = ` width: ${pontosAjuda}%;`
}


function criarBtnAjuda(){
           document.querySelector('#btnAjuda > button').style.display= 'block'
           btn.play()
}


function chamarAjuda(){
           document.querySelector('#btnAjuda > button').style.display= 'none'
           document.getElementById('ajuda').style.display= 'none'
           document.getElementById('tempoAjuda').style.display= 'block'
           document.getElementById('tempoAjuda').textContent = tempoAjudaRegress
           pontosAjuda= -1000
           regressAjuda();
           document.getElementById('goku').style.display='block'
           document.getElementById('goku1').style.display='block'
           ajudaa.play()
           kameramera();
}

function regressAjuda(){
        var regressAjuda = setInterval(() => {
             tempoAjudaRegress= tempoAjudaRegress -1
             document.getElementById('tempoAjuda').textContent = tempoAjudaRegress
              if(tempoAjudaRegress == 0){
                     clearInterval(regressAjuda)
                     document.getElementById('ajuda').style.display= 'block'
                     document.getElementById('tempoAjuda').style.display= 'none'
                     pontosAjuda = 0
                     tempoAjudaRegress= 10
                     document.getElementById('goku').style.display='none'
                     document.getElementById('goku1').style.display='none'
                     ajudaa.play()
              }
        }, 1000);
}


function kameramera(){
        var gokuMatando = setInterval(() => {
                if(document.getElementById('goku').style.display=='block' && document.getElementById('goku').style.display=='block'){
                       matarComKameramera();
                } else {
                       clearInterval(gokuMatando)
                }
        }, 500);
}



function matarComKameramera(){
        //Verificar se acertou o tiro
         var zombies00 = document.querySelectorAll('.animaZombie0')
         var zombies11 = document.querySelectorAll('.animaZombie1')
         var zombies22 = document.querySelectorAll('.animaZombie2')
         zombies00.forEach((valor)=>{
                if(valor.offsetTop == 0 || valor.offsetTop == 30 || valor.offsetTop == 270 || valor.offsetTop == 300){
                    
                        setTimeout(() => {
                            valor.src = 'img/sangue.png'
                            aoo.play()
                            attTotalKills();
                        }, 500);

                        setTimeout(() => {
                            valor.remove()
                        }, 800);
                }
         })

         zombies11.forEach((valor)=>{
              if(valor.offsetTop == 0 || valor.offsetTop == 30 || valor.offsetTop == 270 || valor.offsetTop == 300){
                
                    setTimeout(() => {
                        valor.src = 'img/sangue.png'
                        aoo.play()
                        attTotalKills();
                    }, 500);

                    setTimeout(() => {
                        valor.remove()
                    }, 800);
              }
         })

         zombies22.forEach((valor)=>{
              if(valor.offsetTop == 0 || valor.offsetTop == 30 || valor.offsetTop == 270 || valor.offsetTop == 300){
                
                    setTimeout(() => {
                        valor.src = 'img/sangue.png'
                        aoo.play()
                        attTotalKills();
                    }, 500);

                    setTimeout(() => {
                        valor.remove()
                    }, 800);
              }
         })
}






//Atualizar kills totais 
function  attTotalKills(){
    killsTotal = killsTotal + 1
    document.getElementById('killsTotal').textContent = `Kills: ${killsTotal}`
    if(killsTotal == 50){
           document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
           setTimeout(() => {
                  document.getElementById('avisoKills').textContent = ``
           }, 4000);
    } else if(killsTotal == 100){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 150){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 200){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 250){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 300){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 400){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 500){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 600){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 700){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 800){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 900){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    } else if(killsTotal == 1000){
        document.getElementById('avisoKills').textContent = `${killsTotal} Kills!!!`
        setTimeout(() => {
               document.getElementById('avisoKills').textContent = ``
        }, 4000);
    }
}










//GAME OVERRRRRRRRRRR
function gameOver(){
         document.getElementById('container').style.cssText = `animation: gameOver 2s;`
         perdeu.play()

         setTimeout(() => {
                 zombie.pause()
                 buzina.pause()
                 gameover.play()
         }, 1000);
         
         //Att numero de kills rank do jogador no banco de dados
         db.collection('users').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                  if(doc.data().nome == loginn.nome){
                        gravarNovaPontuacao(doc.data().pontos);                        
                  }
            });
         })

        function gravarNovaPontuacao(p){
                if(p < killsTotal){
                     db.collection('users').doc(`${loginn.nome}`).update({pontos:killsTotal}).then(()=>{
                         console.log('Atualizado')
                     })
                }
         }





         //Tempo de 2seg após fadeOut para mostrar res final e rank melhores
         setTimeout(() => {
            
            //Limpando tela 
            document.getElementById('container').innerHTML = ''
            

            //Criando tabela pai
            var tabelaResFinal = document.createElement('div')
            tabelaResFinal.style.cssText = `
            width: 100%;
            height: 100vh;
            position: relative;
            border: 2px solid white;
            `
            

            //Criando div mostra pontos e inserindo na tabela pai
            var tabelaMeusPontos = document.createElement('div')
            tabelaMeusPontos.style.cssText = `
            position:absolute;
            top: 15%;
            width: 100%; 
            padding: 10px;
            font-size: 30px;
            color: white;
            text-align: center;
            `
            
            tabelaMeusPontos.innerHTML = `<span style="color: orangered;">${loginn.nome}</span> matou <span style="color: red;">${killsTotal}</span> zombies <br> <button id="btnReiniciar" onclick="window.location.href='inicio.html'">Reiniciar</button>`
            tabelaResFinal.appendChild(tabelaMeusPontos)
            


            //RANK ORDENADO ABAIXO ----------------------------------------------           
            var rank = []

            db.collection('users').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                       rank.push({jogador:doc.data().nome, pontuacao: doc.data().pontos})
                });
            })

        setTimeout(() => {
                
            var tabelaRank = document.createElement('div')
            tabelaRank.id = 'tabelaMelhores'
            tabelaRank.style.cssText = `width: 100%`
            tabelaRank.innerHTML = `<h4>Melhores jogadores</h4>`



            setTimeout(() => {
                rank.sort(function(a,b){
                    if(a.pontuacao > b.pontuacao){
                          return -1
                    } else { 
                        return true
                    }
            })

            }, 400);


            setTimeout(() => {
                rank.forEach((valor, indice)=>{
                    tabelaRank.innerHTML += `<p>${indice +1}º ${valor.jogador} - ${valor.pontuacao} Kills</p>`
                })
            }, 500);

            tabelaResFinal.appendChild(tabelaRank)

        }, 1000);
             
            //RANK ORDENADO ACIMA ----------------------------------------------
            



            //Criando footer
            var footer = document.createElement('footer')
            footer.innerHTML = `Copyright © 2022 Weslei Casali`
            footer.style.cssText = `
            position: absolute;
            bottom: 10px;
            width: 100%;
            text-align: center;
            padding: 10px;
            font-size: 15px;
            color: white;
            `
            tabelaResFinal.appendChild(footer)



            //Inserindo tabela pai na tela 
            document.getElementById('container').appendChild(tabelaResFinal)
         }, 2000);

}



