import React, {Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Lista extends Component{
    constructor(props){
        super(props);
        this.state = {
            feed: this.props.dados
        }

        this.mostraLikes = this.mostraLikes.bind(this);
        this.like = this.like.bind(this);
        this.carregaIcone = this.carregaIcone.bind(this);
    }

    mostraLikes(feedLikers){
        let feed = this.state.feed;
        
        if(feed.likers <= 0){
            return; // então não mostra nada
        }
        else{
            return(
                <Text style={styles.likes}>
                    {feed.likers} {feed.likers > 1 ? 'curtidas' : 'curtida'}
                </Text>
            );
        }
    }

    like(){//se estiver likeada:true
       let feed = this.state.feed;
       
        if(feed.likeada === true){
            this.setState({
                feed:{
                    ...feed, // isso é necessário pois se nao inserir ao clicar no like todas as outras propriedades somem,
                    likeada:false,
                    likers: feed.likers -1,
                }
            })
        }else{
            this.setState({
                feed:{
                    ...feed,
                    likeada:true,
                    likers: feed.likers +1,
                }
            })
        }
    }

    carregaIcone(feedLikeada){
        return feedLikeada ? 
        require('../images/likeada.png')
        :
        require('../images/like.png')
    }


    render(){
        return(
            <View style={styles.areaFeed}>

                <View style={styles.viewPerfil}>
                    <Image 
                        source={{uri: this.state.feed.imgperfil}}
                        style={styles.fotoPerfil}
                    />
                    <Text style={styles.nomeUsuario}>{this.state.feed.nome}</Text>
                </View>

                <Image
                    resizeMode="cover" 
                    source={{uri: this.state.feed.imgPublicacao}}
                    style={styles.fotoPublicacao}
                />

                <View style={styles.areaBtn}>
                    <TouchableOpacity onPress={this.like}>
                        <Image 
                            source={this.carregaIcone(this.state.feed.likeada)}
                            style={styles.iconeLike}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSend}>
                        <Image 
                            source={require('../images/send.png')}
                            style={styles.iconeLike}
                        />
                    </TouchableOpacity>
                </View>

                {this.mostraLikes(this.state.feed.likers)}

                <View style={styles.viewRodape}>
                    <Text style={styles.nomeRodape}>
                        {this.state.feed.nome}
                    </Text>
                    <Text style={styles.descRodape}>
                        {this.state.feed.descricao}
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    areaFeed:{},
    viewPerfil:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        padding:8,
    },
    fotoPerfil:{
        width:50,
        height:50,
        borderRadius:25,

    },
    nomeUsuario:{
        fontSize:22,
        textAlign:'left',
        color:'#000000',
    },
    fotoPublicacao:{
        flex:1,
        height:400,
        alignItems:'center',
    },

    iconeLike:{
        width:33,
        height:33,
    },
    areaBtn:{
        flexDirection:'row',
        padding:5,
    },
    btnSend:{
        paddingLeft:5,
    },
    viewRodape:{
        flexDirection:'row',
        alignItems:'center',
    },
    descRodape:{
        paddingLeft:5,
        fontSize:15,
        color:'#000'
    },
    nomeRodape:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000',
        paddingLeft:5,  
    },
    likes:{
        fontWeight:'bold',
        paddingLeft:5,
    },

});

