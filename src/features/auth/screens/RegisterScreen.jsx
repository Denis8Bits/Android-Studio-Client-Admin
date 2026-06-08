import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { COLORS, SPACING, FONT_SIZE } from "../../../shared/constants/theme";
import Input from "../../../shared/components/common/Input";
import Button from "../../../shared/components/common/Button";
import KinalSportLogo from "../../../../assets/kinal_sportsLogo.png";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            lastName: "",
            username: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Register datos:", {
            name: data.name,
            lastName: data.lastName,
            username: data.username,
            phone: data.phone,
            email: data.email
        });
        Alert.alert("Registro", "Registro exitoso ");
    };

    const passwordValue = watch("password");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image source={KinalSportLogo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.title}>Crear cuenta</Text>

                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "El nombre es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Nombre"
                                placeholder="Tu nombre"
                                value={value} onChangeText={onChange}
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="lastName"
                        autoCapitalize="none"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Apellido"
                                placeholder="Tu apellido"
                                value={value} onChangeText={onChange}
                                error={errors.lastName?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: "El usuario es requerido",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input label=
                                "Usuario"
                                placeholder="tu_usuario"
                                value={value} onChangeText={onChange}
                                autoCapitalize="none"
                                error={errors.username?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        rules={{ required: "El teléfono es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Teléfono"
                                placeholder="+34 600 123 456"
                                value={value} onChangeText={onChange}
                                keyboardType="phone-pad"
                                error={errors.phone?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "El correo es requerido",
                            pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Correo"
                                placeholder="correo@ejemplo.com"
                                value={value} onChangeText={onChange}
                                utoCapitalize="none"
                                error={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: "La contraseña es requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Contraseña"
                                placeholder="********"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry autoCapitalize="none"
                                error={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: "Confirma la contraseña",
                            validate: (val) => val === passwordValue || "Las contraseñas no coinciden",
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Confirmar contraseña"
                                placeholder="********"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry autoCapitalize="none"
                                error={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <Button
                        title="Registrar" onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.link}> Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

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
    title: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.secondary,
        marginBottom: SPACING.md,
        textAlign: "center",
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
});

export default RegisterScreen;