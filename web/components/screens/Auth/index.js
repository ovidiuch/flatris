// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../../actions/global';
import { MAX_NAME_LENGTH, MAX_EMAIL_LENGTH } from 'shared/constants/user';
import { createUserSession } from '../../../utils/api';
import Button from '../../Button';
import FlatrisIntro from '../onboarding/FlatrisIntro';
import Multiplayer from '../onboarding/Multiplayer';
import ZeroSum from '../onboarding/ZeroSum';
import HowToPlay from '../onboarding/HowToPlay';
import Screen from '../shared/Screen';

import type { User, State } from 'shared/types/state';

type Props = {
  jsReady: boolean,
  auth: typeof auth
};

type OnboardingStep = 'intro' | '1vs1' | '0sum' | 'howto';

type LocalState = {
  name: string,
  email: string,
  logIn: boolean,
  pendingAuth: boolean,
  user: ?User,
  onboardingStep: OnboardingStep,
  hasSubmitted: boolean
};

const ONBOARDING_SCREENS = {
  intro: FlatrisIntro,
  '1vs1': Multiplayer,
  '0sum': ZeroSum,
  howto: HowToPlay
};

const ONBOARDING_STEPS = Object.keys(ONBOARDING_SCREENS);

class Auth extends Component<Props, LocalState> {
  nameField: ?HTMLInputElement;
  emailField: ?HTMLInputElement;

  state = {
    name: '',
    email: '',
    logIn: false,
    pendingAuth: false,
    user: null,
    onboardingStep: 'intro',
    hasSubmitted: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.jsReady && !prevProps.jsReady) {
      this.focusOnNameField();
    }
  }

  handeNameInputRef = node => {
    this.nameField = node;
    this.focusOnNameField();
  };

  handeEmailInputRef = node => {
    this.emailField = node;
    this.focusOnEmailField();
  };

  focusOnNameField = () => {
    if (this.nameField && this.props.jsReady) {
      this.nameField.focus();
    }
  };

  focusOnEmailField = () => {
    if (this.emailField && this.props.jsReady) {
      this.emailField.focus();
    }
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleLogin = () => {
    this.setState({
      logIn: true
    });
  };

  handleCancelLogin = () => {
    this.setState({
      logIn: false
    });
  };

  handleGo = async e => {
    e.preventDefault();

    const { name } = this.state;
    if (name) {
      this.setState({
        pendingAuth: true
      });

      const user = await createUserSession(name);

      // Add the user to state and delay adding it to the app state until the
      // user seems the onboarding screen
      this.setState({
        pendingAuth: false,
        user
      });
    }
  };

  handleOnboardingNext = () => {
    const { auth } = this.props;
    const { user, onboardingStep } = this.state;

    if (!user) {
      throw new Error('Onboarding with missing user');
    }

    const step = ONBOARDING_STEPS.indexOf(onboardingStep);
    const nextStep = ONBOARDING_STEPS[step + 1];

    if (nextStep) {
      this.setState({
        onboardingStep: nextStep
      });
    } else {
      this.setState({
        hasSubmitted: true
      });

      auth(user);
    }
  };

  render() {
    const { jsReady } = this.props;
    const {
      name,
      email,
      logIn,
      pendingAuth,
      user,
      onboardingStep,
      hasSubmitted
    } = this.state;

    // Greet user with onboarding after they authenticate
    if (user) {
      const OnboardingScreen = ONBOARDING_SCREENS[onboardingStep];

      return (
        <OnboardingScreen
          disabled={hasSubmitted}
          onNext={this.handleOnboardingNext}
        />
      );
    }

    return (
      <form onSubmit={this.handleGo}>
        <Screen
          title={logIn ? `Welcome` : `One sec...`}
          message={
            logIn ? (
              <>
                <p onClick={this.focusOnNameField}>Enter your name</p>
                <p>
                  <input
                    type="text"
                    value={name}
                    onChange={this.handleNameChange}
                    disabled={!jsReady || pendingAuth}
                    ref={this.handeNameInputRef}
                    placeholder="Monkey"
                    maxLength={MAX_NAME_LENGTH}
                  />
                </p>
                <p onClick={this.focusOnEmailField}>Enter your email</p>
                <p>
                  <input
                    type="text"
                    value={email}
                    onChange={this.handleEmailChange}
                    disabled={!jsReady || pendingAuth}
                    ref={this.handeEmailInputRef}
                    placeholder="wise@ass.com"
                    maxLength={MAX_NAME_LENGTH}
                  />
                </p>
                <p>
                  <small>Fake names allowed ;-)</small>
                </p>
              </>
            ) : (
              <>
                <p onClick={this.focusOnNameField}>Enter your name</p>
                <p>
                  <input
                    type="text"
                    value={name}
                    onChange={this.handleNameChange}
                    disabled={!jsReady || pendingAuth}
                    ref={this.handeNameInputRef}
                    placeholder="Monkey"
                    maxLength={MAX_EMAIL_LENGTH}
                  />
                </p>
                <p>
                  <small>Fake names allowed ;-)</small>
                </p>
              </>
            )
          }
          actions={[
            <Button type="submit" disabled={!jsReady || !name || pendingAuth}>
              Enter
            </Button>,
            <Button
              bgColor="#fff"
              color="#34495f"
              colorDisabled="rgba(52, 73, 95, 0.6)"
              onClick={logIn ? this.handleCancelLogin : this.handleLogin}
            >
              {logIn ? 'Guest' : 'Log in'}
            </Button>
          ]}
        />
        <style jsx>{`
          input {
            box-sizing: border-box;
            width: 100%;
            padding: 0.8em;
            border: 0;
            background: #fff;
            color: #666;
            box-shadow: inset 0.25em 0.25em 0 0 rgba(0, 0, 0, 0.2);
            font-size: 1em;
            text-transform: uppercase;
            outline: none;
            transition: box-shadow 0.5s;
          }
          input:focus {
            box-shadow: inset 0.25em 0.25em 0 0 #3993d0;
            color: #333;
          }
          input::placeholder {
            color: #ccc;
            font-weight: 300;
          }
          input:disabled {
            cursor: not-allowed;
          }
        `}</style>
      </form>
    );
  }
}

function mapStateToProps({ jsReady }: State): $Shape<Props> {
  return { jsReady };
}

const mapDispatchToProps = {
  auth
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
