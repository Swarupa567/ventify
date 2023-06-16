import {
  Box,
  Center,
  Heading,
  Image,
  InputGroup,
  InputRightAddon,
  Input,
  Text,
  Button,
  Highlight,
  Card,
  CardBody,
  Stack,
  VStack,
  Divider,
  Flex,
  Link,
  InputRightElement,
} from "@chakra-ui/react";

import hero from "../assets/hero.svg";
import github from "../assets/github.png";
import { howItWorks } from "../assets/data/data";
import color from "../styles/colors";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import useToastMessage from "../hooks/useToastMessage";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
} from "../firebase/firebase";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { VentifyContext } from "../context/VentifyContextProvider";
import Logo from "../components/Logo";

const Header = () => {
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" padding="0 20px">
        <Logo />

        <Link href="https://github.com/BrijenMakwana/ventify" isExternal>
          <Flex
            alignItems="center"
            backgroundColor="blackAlpha.100"
            padding="5px 10px"
            borderRadius="30px"
          >
            <Image
              objectFit="contain"
              src={github}
              alt="git"
              width="35px"
              aspectRatio="1"
            />
            <Text textTransform="capitalize" marginLeft="10px" fontSize="sm">
              view code
            </Text>
          </Flex>
        </Link>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  );
};

const HowItWork = (props) => {
  const { title, description, image } = props;
  return (
    <Center>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="filled"
        padding="30px 70px"
        marginTop="50px"
        width="70vw"
      >
        <Image
          objectFit="contain"
          src={image}
          alt="ventify"
          width="150px"
          aspectRatio="1"
        />

        <Stack marginLeft="25px">
          <CardBody>
            <Heading size="md" textTransform="capitalize">
              {title}
            </Heading>

            <Text py="2">{description}</Text>
          </CardBody>
        </Stack>
      </Card>
    </Center>
  );
};

const HowItWorks = () => {
  return (
    <VStack margin="200px 0">
      <Heading
        as="h2"
        size="2xl"
        textTransform="capitalize"
        textAlign="center"
        marginBottom="50px"
      >
        how it works
      </Heading>

      <VStack>
        {howItWorks.map((item) => (
          <HowItWork {...item} key={item.id} />
        ))}
      </VStack>
    </VStack>
  );
};

const HomePage = () => {
  const [studentRollNo, setStudentRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const [loginUiIsVisible, setLoginUiIsVisible] = useState(true);

  const [isRegisteringUser, setIsRegisteringUser] = useState(false);
  const [isLoginInUser, setIsLoginInUser] = useState(false);

  const { setLoggedInBatchYear } = useContext(VentifyContext);

  const { showToastMessage } = useToastMessage();
  const navigate = useNavigate();

  const userIsLoggedIn = auth.currentUser;

  const resetUserInputs = () => {
    setStudentRollNo("");
    setPassword("");
  };

  const logout = async () => {
    await signOut(auth);
  };

  const sendEmailVerificationLink = async (userEmail) => {
    try {
      await sendEmailVerification(auth.currentUser);
      showToastMessage(
        "Link Sent",
        `We have sent you the email verification link at ${userEmail}. Please check your inbox.`,
        "success"
      );
    } catch (error) {
      showToastMessage("Error", error.message, "error");
    }
  };

  const registerUser = async () => {
    setIsRegisteringUser(true);
    const userEmail = `${studentRollNo}@daiict.ac.in`;

    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await sendEmailVerificationLink(userEmail);
      logout();
      setLoginUiIsVisible(true);
      setIsRegisteringUser(false);
      resetUserInputs();
    } catch (error) {
      showToastMessage("Error", error.message, "error");
      setIsRegisteringUser(false);
      resetUserInputs();
    }
  };

  const login = async () => {
    setIsLoginInUser(true);
    const userEmail = `${studentRollNo}@daiict.ac.in`;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      const emailIsVerified = user.emailVerified;

      if (
        !emailIsVerified &&
        import.meta.env.VITE_TESTING_ENVIRONMENT == "prod"
      ) {
        logout();
        showToastMessage("Error", "Please verify your email first!!", "error");
        setIsLoginInUser(false);
        resetUserInputs();

        return;
      }
      const currentbatchYear = Number(studentRollNo.toString().substring(0, 4));
      setLoggedInBatchYear(currentbatchYear);
      localStorage.setItem("loggedInBatchYear", currentbatchYear);

      navigate("/confessions", { replace: true });
      setIsLoginInUser(false);
      resetUserInputs();
    } catch (error) {
      showToastMessage("Error", error.message, "error");
      setIsLoginInUser(false);
      resetUserInputs();
    }
  };
  return (
    <Box>
      <Header />

      <Center marginTop="40px">
        <Heading
          as="h1"
          textTransform="capitalize"
          size="2xl"
          lineHeight="50px"
        >
          <Highlight
            query={["fear", "judgment"]}
            styles={{
              px: "5",
              py: "1",
              rounded: "full",
              bg: color.primary,
              color: "#fff",
            }}
          >
            Confess without fear, connect without judgment
          </Highlight>
        </Heading>
      </Center>

      <Flex justifyContent="space-between" marginTop="60px" alignItems="center">
        <Center flex="1">
          <Image objectFit="contain" src={hero} alt="ventify" width="500px" />
        </Center>

        <Center flex="1">
          <Box width="300px" padding="10px">
            {userIsLoggedIn ? (
              <Button
                colorScheme="purple"
                variant="solid"
                textTransform="capitalize"
                size="md"
                rightIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/confessions")}
              >
                alrady logged in
              </Button>
            ) : (
              <>
                <Heading
                  as="h2"
                  textTransform="capitalize"
                  fontSize="3xl"
                  textAlign="center"
                >
                  {loginUiIsVisible ? "login" : "register"}
                </Heading>

                <InputGroup size="md" marginTop="20px">
                  <Input
                    placeholder="e.g. 201812010"
                    focusBorderColor={color.primary}
                    variant="outline"
                    type="number"
                    autoFocus
                    onChange={(e) => setStudentRollNo(e.target.value)}
                    value={studentRollNo}
                  />

                  <InputRightAddon>
                    <Text>@daiict.ac.in</Text>
                  </InputRightAddon>
                </InputGroup>

                <InputGroup size="md" marginTop="20px">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    focusBorderColor={color.primary}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowpassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Box marginTop="20px" display="flex" flexDirection="column">
                  <Button
                    colorScheme="purple"
                    variant="solid"
                    textTransform="capitalize"
                    isDisabled={!studentRollNo || !password}
                    size="md"
                    onClick={loginUiIsVisible ? login : registerUser}
                    isLoading={
                      loginUiIsVisible ? isLoginInUser : isRegisteringUser
                    }
                    loadingText={
                      loginUiIsVisible
                        ? "please wait"
                        : "sending verification link"
                    }
                  >
                    {loginUiIsVisible ? "login" : "register"}
                  </Button>

                  <Button
                    colorScheme="purple"
                    variant="link"
                    size="sm"
                    marginTop="10px"
                    onClick={() => setLoginUiIsVisible((prev) => !prev)}
                  >
                    {loginUiIsVisible ? "new here?" : "go back to login"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Center>
      </Flex>

      <HowItWorks />
    </Box>
  );
};

export default HomePage;
