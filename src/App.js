import React, { useEffect, useState, Fragment } from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Tabletop from "tabletop";
import RcIf, { RcElse } from 'rc-if';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: 'white'
  },

  header: {
    textAlign: 'center',
    backgroundColor: '#808080',
    color: 'white',
  },

  text: {
    margin: theme.spacing(1),
    textAlign: 'left',
  },
  total: {
    margin: theme.spacing(1),
    textAlign: 'center',
  },

  botao: {
    marginLeft: theme.spacing(5),
    color: 'white',
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[500],
  },
}));

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [dataFUll, setDataFull] = useState([]);


  const OpenWpp = (telefone, estrangeira) => {
    // separa strings por 'e' CASO TENHA MAIS DE UM TELEFONE NA STRING
    var retorno = telefone.split("e");
    telefone = retorno[0]
    // remover caracteres e espaço de string telefone
    telefone = telefone.replace(/[^\d]+/g, '')
    //montar url
    var url;
    if (estrangeira === false) {
      // 55 do brasil
      url = "https://api.whatsapp.com/send?phone=55" + telefone + "&text=Oi%2C%20quero%20saber%20mais%20sobre%20a%20escola%20de%20jesus%20EX"
    } else {
      // sem 55 estrangeira
      url = "https://api.whatsapp.com/send?phone=" + telefone + "&text=Oi%2C%20quero%20saber%20mais%20sobre%20a%20escola%20de%20jesus%20EX"
    }

    window.open(url);
  };

  const OpenLink = (link) => {
    window.open(link);
    //window.open("https://www.instagram.com/filosofiaex/");
  };

  const [estados, setEstados] = React.useState([{ "label": "Acre", "value": "AC" }, { "label": "Alagoas", "value": "AL" }, { "label": "Amap\u00e1", "value": "AP" }, { "label": "Amazonas", "value": "AM" }, { "label": "Bahia", "value": "BA" }, { "label": "Cear\u00e1", "value": "CE" }, { "label": "Distrito Federal", "value": "DF" }, { "label": "Esp\u00edrito Santo", "value": "ES" }, { "label": "Goi\u00e1s", "value": "GO" }, { "label": "Maranh\u00e3o", "value": "MA" }, { "label": "Mato Grosso", "value": "MT" }, { "label": "Mato Grosso do Sul", "value": "MS" }, { "label": "Minas Gerais", "value": "MG" }, { "label": "Paran\u00e1", "value": "PR" }, { "label": "Para\u00edba", "value": "PB" }, { "label": "Par\u00e1", "value": "PA" }, { "label": "Pernambuco", "value": "PE" }, { "label": "Piau\u00ed", "value": "PI" }, { "label": "Rio Grande do Norte", "value": "RN" }, { "label": "Rio Grande do Sul", "value": "RS" }, { "label": "Rio de Janeiro", "value": "RJ" }, { "label": "Rond\u00f4nia", "value": "RO" }, { "label": "Roraima", "value": "RR" }, { "label": "Santa Catarina", "value": "SC" }, { "label": "Sergipe", "value": "SE" }, { "label": "S\u00e3o Paulo", "value": "SP" }, { "label": "Tocantins", "value": "TO" }]);
  const [estado, setEstado] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = async (event) => {
    setEstado(event.target.value);

    if (event.target.value === 'todas') {
      setData(dataFUll)
    } else {
      var dataupdate = []
      await dataFUll.map((data, i) => {
        if (data.estado === event.target.value) {
          dataupdate.push(data)
        }
        if (dataFUll.length - 1 === i) {
          setData(dataupdate)
        }
      })
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const VerEstrangeiras = () => {
    var dataupdate = []
    dataFUll.map((data, i) => {
      if (data.estado === 'estrangeira') {
        console.log(data)
        dataupdate.push(data)
      }
      if (dataFUll.length - 1 === i) {

        setData(dataupdate)
      }
    })
  }

  useEffect(() => {
    Tabletop.init({
      key: "1ojdM2qT1OaeHkuhfqBlHrSOLUPiyscwn2wAOhY0j7RM",
      simpleSheet: true
    })
      .then((data) => {
        data.splice(0, 4) // removendo quatro primeiros elementos do array
        data.splice(data.length - 1, 1) // removendo ultimo elemento do array


        for (let index = 0; index < data.length; index++) {
          //console.log(data[index].cidade)

          var retorno = data[index].cidade.split(",");
          var PalavraDepoisUltimaVirgula = retorno[retorno.length - 1];

          if (PalavraDepoisUltimaVirgula.length === 3) {
            // estado brasileiro
            data[index].estado = PalavraDepoisUltimaVirgula.trim()
            data[index].estrangeira = false
            //console.log(data[index])

          } else {
            // escola estrangeira
            data[index].estado = 'estrangeira'
            data[index].estrangeira = true
          }

        }
        setData(data)  // dados que aparecem da view
        setDataFull(data) // todos os dados para filtragem
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={classes.header}>
        < br />
        <h1>✡ Escolas de JESUS e Universidade EX</h1>
        <div>

          <Typography variant="body1" >
            Filtre por estado:
                </Typography>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={estado}
              onChange={handleChange}
            >
              <MenuItem value='todas'>Ver todas</MenuItem>
              {estados.map((data, i) => (
                <MenuItem key={i} value={data.value}>{data.label}</MenuItem>
              ))}

            </Select>
          </FormControl>
          < br />

          <Button variant="contained" className={classes.formControl}
            onClick={() => { VerEstrangeiras() }}>Escolas estrangeiras
                </Button>
          < br />

          <Typography variant="body2" className={classes.text}>
            * Se você perceber que algum professor (a) ou Escola, está falando contra o ideal EX, DENUNCIE para advogadoaovivo@gmail.com
            </Typography>
          <Typography variant="body2" className={classes.text}>
            * Se sua Escola não consta aqui, nos envie seu nome, região e Whatsapp
             <Button className={classes.botao} onClick={() => { OpenLink('https://docs.google.com/spreadsheets/d/1ojdM2qT1OaeHkuhfqBlHrSOLUPiyscwn2wAOhY0j7RM') }}
              variant="outlined"
              startIcon={<ListAltIcon />}
            > Acessar planilha original</Button>
            </Typography>
          < br />
        </div>
      </div>

      <div className={classes.total}>
        <p> Mostrando {data.length} contatos</p>
      </div>

      <CssBaseline />
      <Container fixed>

        <div className={classes.root}>
          <Grid container spacing={3}>
            {data.map((itemm, i) => (
              <Grid item key={i}>
                <Fragment key={i}>
                  <Card className={classes.paper}>

                    <CardHeader
                      title={itemm.cidade}
                      subheader={itemm.nome}
                    />

                    <CardContent>
                      <RcIf if={itemm.wpp !== 'Fundador e Professor'} >
                        <RcIf if={itemm.wpp.substring(0, 1) === '('} >
                          <Button onClick={() => { OpenWpp(itemm.wpp, itemm.estrangeira) }}
                            variant="outlined"
                            startIcon={<WhatsAppIcon style={{ color: green[500] }} />}
                          >{itemm.wpp} Enviar</Button>
                        </RcIf>


                        <RcElse>
                          <Button onClick={() => { OpenLink('https://www.instagram.com/filosofiaex/') }}
                            variant="outlined"
                            startIcon={<InstagramIcon />}
                          > Instagram</Button>

                        </RcElse>
                      </RcIf>
                      <br />
                      <br />
                      <RcIf if={itemm.wpp !== 'Fundador e Professor'} >
                        <Typography variant="h6" className={classes.text}>
                          Akel sobre:
                      </Typography>
                      </RcIf>
                      <Typography variant="body2" component="p" className={classes.text}>
                        <RcIf if={itemm.wpp === 'Fundador e Professor'} >
                          {itemm.sobre + ' '}<a href="https://universidadebalneariocamboriu.com/">ACESSE O SITE </a>
                          <RcElse>
                            {itemm.sobre}
                          </RcElse>
                        </RcIf>
                      </Typography>
                    </CardContent>
                  </Card>
                </Fragment>
              </Grid>
            ))}

          </Grid>
        </div>

      </Container>
    </>
  );
}
