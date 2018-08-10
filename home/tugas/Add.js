import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Col,Spinner, Button, Text, Card, Header, Container, Content, Title, Right, Body, Form, Item, Label, Input, Textarea, CardItem, Left, Grid, Row } from "native-base";
import DatePicker from "./DatePicker";
import { addTugas } from "../../config/Api";
class Add extends Component {
    constructor(props) {
        super(props);
        let date = new Date(Date.now());
        let year = date.getFullYear();
        let day = (date.getDate() <= 9) ? "0" + date.getDate() : date.getDate();
        let month = (date.getMonth() <= 9) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        let formatedDate = year+"-"+month+"-"+day;
        this.state = {
            data: {
                judul : "",
                desc : "",
                mulai : formatedDate,
                sampai : formatedDate,
                idKuliah : this.props.navigation.state.params.idKuliah
            },
            isLoading: false
        }
        console.log(this.props.navigation.state.params)
    }


    save = () => {
        this.setState({
            isLoading : true
        })
        console.log(this.state.data);
        AsyncStorage.getItem('token').done((token) => {
           addTugas(token,this.state.data,() => {
               this.props.navigation.state.params.doUpdate();
               this.props.navigation.goBack();
           })
        })
    }

    render() {       
        
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
                                        data: {
                                            ...data,
                                            judul: text
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
                                    placeholder="Deskripsi Tugas"
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
                                            data: {
                                                ...data,
                                                mulai: date
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

                    <Button 
                        full
                        onPress={this.save}
                    >
                        {
                            (this.state.isLoading) ? <Spinner /> : <Text>Simpan</Text>
                        }
                    </Button>

                </Card>
            </Content>
            // <DatePicker date="2018-06-22" />
        )
    }
}

export default Add;