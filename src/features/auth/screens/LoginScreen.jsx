import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { COLORS, SPACING, FONT_SIZE } from "../../../shared/constants/theme";
import Input from "../../../shared/components/common/Input";
import Button from "../../../shared/components/common/Button";

import KinalSportLogo from "../../../../assets/kinal_sportsLogo.png";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {

    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            emailOrUsername: "",
            password: "",
        }
    });

    const onSubmit = (data) => {
        console.log('Login datos:', data);
        Alert.alert('Iniciar Sesión', 'Datos enviados (diseño)');
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={KinalSportLogo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.subtitle}>Bienvenido de nuevo</Text>

                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="emailOrUsername"
                        rules={{ required: "El correo o usuario es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Correo o Usuario"
                                placeholder="correo@ejemplo.com"
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                                error={errors.emailOrUsername?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: "La contraseña es requerida", minLength: { value: 6, message: 'Mínimo 6 caracteres' } }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Contraseña"
                                placeholder="********"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                                autoCapitalize="none"
                                error={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        title="Iniciar Sesión"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.link}> Registrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.xl,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: SPACING.xxl,
    },
    logo: {
        height: 80,
        width: 200,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.secondary,
        marginTop: SPACING.sm,
    },
    form: {
        width: "100%",
    },
    button: {
        marginTop: SPACING.lg,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: SPACING.xl,
    },
    footerText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textLight,
    },
    link: {
        fontSize: FONT_SIZE.md,
        color: COLORS.primary,
        fontWeight: "700",
    },
})

export default LoginScreen;