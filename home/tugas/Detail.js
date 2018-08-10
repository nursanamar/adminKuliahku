import React, { Component } from 'react';
// import { Text } from 'react-native';
import { Col,Spinner,Button,Text,Card,Header,Container,Content,Title,Right,Body,Form,Item,Label,Input,Textarea,CardItem,Left,Grid,Row } from "native-base";
import DatePicker from "./DatePicker";
class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {...this.props.navigation.state.params.data},
            isLoading : false
        }
    }
    render(){
        return (
            <Content>
                <Card >
                    <Form>
                        <Item inlineLabel>
                            <Label>Judul</Label>
                            <Input 
                                value={this.state.data.judul} 
                                onChangeText={(text) => {
                                    let data = this.state.data;
                                    this.setState({
                                        data : {
                                            ...data,
                                            judul : text
                                        }
                                    })
                                }}
                            />
                        </Item>
                    </Form>
                    <CardItem>
                        <Grid>
                            <Col>
                                <Textarea
                                    rowSpan={5}
                                    bordered
                                    placeholder="Deskripsi tugas"
                                    value={this.state.data.desc}
                                    onChangeText={(text) => {
                                        let data = this.state.data;
                                        this.setState({
                                            data: {
                                                ...data,
                                                desc: text
                                            }
                                        });
                                    }}
                                />
                            </Col>
                        </Grid>
                    </CardItem>
                    <CardItem>
                        <Grid>
                            <Row>
                                <Left>
                                    <Text>Mulai : </Text>
                                </Left>
                                
                                    <DatePicker 
                                        date={this.state.data.mulai} 
                                        onChange={(date) => {
                                            let data = this.state.data;
                                            this.setState({
                                                data : {
                                                    ...data,
                                                    mulai : date
                                                }
                                            })
                                        }}
                                    />
                               
                            </Row>
                            <Row>
                                <Left>
                                    <Text>Sampai : </Text>
                                </Left>
                                <DatePicker 
                                    date={this.state.data.sampai}
                                    onChange={(date) => {
                                        let data = this.state.data;
                                        this.setState({
                                            data: {
                                                ...data,
                                                sampai: date
                                            }
                                        })
                                    }}
                                />
                                
                            </Row>
                        </Grid>
                    </CardItem>
                </Card>
                <Card>
                    
                    <Button full><Text>Simpan</Text></Button>
                    
                </Card>
            </Content>
            // <DatePicker date="2018-06-22" />
        )
    }
}

export default Detail;