import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import * as AuthenticationStore from '../../store/Authentication';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import WarningIcon from '@material-ui/icons/Warning';
import Axios from 'axios';
import { Redirect, useHistory } from 'react-router';
import { CircularProgress, Snackbar } from '@material-ui/core';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    warming: {
        display: "flex",
        alignItems: "center",
        color: "#f50057",
    },
    warmingIcon: {
        fontSize: "16px",
        marginBottom: "4px",
        marginRight: "4px",
    },
}));

type AuthenticateProps = AuthenticationStore.AuthenticateState & typeof AuthenticationStore.actionCreators

function SignUp(props: AuthenticateProps) {
    const { errors, setError, register, handleSubmit, clearErrors, watch } = useForm();
    const history = useHistory();
    const classes = useStyles();
    const password = React.useRef({});
    password.current = watch("password", "");
    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        history.push("/");
    };

    const [loading, setLoading] = React.useState(false);

    const submitHandler = (data: AuthenticationStore.Authenticate) => {
        clearErrors();
        submit(data);
    }

    const submit = (data: AuthenticationStore.Authenticate) => {
        setLoading(true);
        Axios.post("/api/users/register", data)
            .then(res => {
                if (res.status === 200) {
                    console.log("Successful cc!");
                    setOpen(true);
                    setLoading(false);
                }
            })
            .catch(ex => {
                setLoading(false);
                console.log(ex.response);
                setError("email", {
                    type: "manual",
                    message: "Email đã tồn tại!"
                });
            })
    }

    if (props.status) {
        if (props.authenticate.roleId === 1) {
            return <Redirect to="/home" />
        } else {
            return <Redirect to="/admin/home" />
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng Kí
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(submitHandler)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Họ và Tên"
                                name="name"
                                error={errors["name"] !== null && errors["name"] !== undefined}
                                inputRef={register({ required: "Họ và Tên không được để trống!", maxLength: { value: 50, message: "Họ và tên tối đa 50 kí tự!" } })}
                            />
                            {errors["name"] &&
                                <div className={classes.warming}>
                                    <WarningIcon className={classes.warmingIcon} />
                                    <span>{errors["name"].message}</span>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ Email"
                                name="email"
                                autoComplete="email"
                                error={errors["email"] !== null && errors["email"] !== undefined}
                                inputRef={register({
                                    required: "Email không được để trống!", pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email không hợp lệ!"
                                    }, maxLength: { value: 50, message: "Họ và tên tối đa 50 kí tự!" } })}
                            />
                            {errors["email"] &&
                                <div className={classes.warming}>
                                    <WarningIcon className={classes.warmingIcon} />
                                    <span>{errors["email"].message}</span>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                error={errors["password"] !== null && errors["password"] !== undefined}
                                inputRef={register({ required: "Mật khẩu không được để trống!" })}
                            />
                            {errors["password"] &&
                                <div className={classes.warming}>
                                    <WarningIcon className={classes.warmingIcon} />
                                    <span>{errors["password"].message}</span>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm"
                                label="Nhập lại mật khẩu"
                                type="password"
                                id="confirm"
                                error={errors["confirm"] !== null && errors["confirm"] !== undefined}
                                inputRef={register({
                                    validate: value =>
                                        value === password.current || "Không khớp với mật khẩu"
                                })}
                            />
                            {errors["confirm"] &&
                                <div className={classes.warming}>
                                    <WarningIcon className={classes.warmingIcon} />
                                    <span>{errors["confirm"].message}</span>
                                </div>
                            }
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {loading ? <CircularProgress style={{ 'color': 'white'}} size="20" /> : "Đăng kí"}
                    </Button>
                    {errors["REGISTER_FAIL"] &&
                        <div className={classes.warming}>
                            <WarningIcon className={classes.warmingIcon} />
                            <span>{errors["REGISTER_FAIL"].message}</span>
                        </div>
                    }
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/#/" variant="body2">
                                Đã có tài khoản? Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} message="Đăng kí thành công!" />
        </Container>
    );
}

export default connect(
    (state: ApplicationState) => state.authenticate,
    AuthenticationStore.actionCreators
)(SignUp as any)