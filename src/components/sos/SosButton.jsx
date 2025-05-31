import React, { useState, useEffect } from 'react';
import { AlertTriangle, PhoneCall, Share2, X, Bell, MapPin, Volume2, Shield, VolumeX } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const SosButton = () => {
  const [expanded, setExpanded] = useState(false);
  const [activated, setActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [alarmActive, setAlarmActive] = useState(false);

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    } else if (showCountdown && countdown === 0) {
      setShowCountdown(false);
      activateEmergencyMode();
    }
  }, [showCountdown, countdown]);

  const startAlarm = () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    setAudioContext(ctx);
    setOscillator(osc);
    setAlarmActive(true);
  };

  const stopAlarm = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
    }
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
    }
    setAlarmActive(false);
  };

  const handleActivateSOS = () => {
    if (activated) {
      setActivated(false);
      stopAlarm();
      return;
    }

    setShowCountdown(true);
    setCountdown(5);
  };

  const cancelEmergency = () => {
    setShowCountdown(false);
    setCountdown(5);
    stopAlarm();
  };

  const activateEmergencyMode = () => {
    setActivated(true);
    startAlarm();

    // Simulate sending emergency alerts
    navigator.vibrate?.(1000);

    // In a real app, these would trigger actual emergency procedures
    setTimeout(() => {
      console.log('Emergency services notified');
      console.log('Emergency contacts alerted');
      console.log('Location shared with authorities');
    }, 1000);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Emergency Options Panel */}
      <div
        className={cn(
          'absolute bottom-full right-0 mb-4 transition-all duration-300',
          expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <div className="bg-white dark:bg-card-dark rounded-lg shadow-elevation-3 border border-border-light dark:border-border-dark p-2 space-y-1">
          <Button
            variant="danger"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => window.alert('This would call emergency services in a real app')}
          >
            <PhoneCall size={16} />
            Call Police
          </Button>

          <Button
            variant="warning"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => window.alert('This would share your location in a real app')}
          >
            <Share2 size={16} />
            Share Location
          </Button>

          <Button
            variant={alarmActive ? 'danger' : 'warning'}
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => (alarmActive ? stopAlarm() : startAlarm())}
          >
            {alarmActive ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {alarmActive ? 'Stop Alarm' : 'Sound Alarm'}
          </Button>
        </div>
      </div>

      {/* Main SOS Button */}
      <div className="relative">
        {activated && (
          <>
            <div className="absolute inset-0 -m-2 rounded-full animate-ping bg-danger-500 opacity-20"></div>
            <div className="absolute inset-0 -m-4 rounded-full animate-pulse bg-danger-500 opacity-10"></div>
          </>
        )}

        {showCountdown && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="bg-danger-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              {countdown}s
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-card-dark shadow-elevation-1"
              onClick={cancelEmergency}
            >
              Cancel
            </Button>
          </div>
        )}

        {alarmActive && !showCountdown && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <Button variant="danger" size="sm" className="shadow-elevation-1" onClick={stopAlarm}>
              Stop Alarm
            </Button>
          </div>
        )}

        <Button
          variant={activated ? 'danger' : 'primary'}
          size="lg"
          className={cn(
            'rounded-full h-12 w-12 shadow-elevation-4 transition-all duration-300',
            activated && 'animate-pulse'
          )}
          onClick={handleActivateSOS}
        >
          {activated ? <X size={24} /> : <AlertTriangle size={24} />}
        </Button>

        {!activated && !showCountdown && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-surface-light dark:bg-surface-dark shadow-elevation-1 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <X size={12} /> : '+'}
          </Button>
        )}
      </div>
    </div>
  );
};
