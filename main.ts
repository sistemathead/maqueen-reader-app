bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (receivedString == "Forward") {
        basic.showArrow(ArrowNames.North)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
        basic.pause(2175)
        maqueen.motorStop(maqueen.Motors.All)
    } else if (receivedString == "Backward") {
        basic.showArrow(ArrowNames.South)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 30)
        basic.pause(2175)
        maqueen.motorStop(maqueen.Motors.All)
    } else if (receivedString == "Left" || receivedString == "TurnLeft") {
        basic.showArrow(ArrowNames.West)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        basic.pause(970)
        maqueen.motorStop(maqueen.Motors.All)
    } else if (receivedString == "Right" || receivedString == "TurnRight") {
        basic.showArrow(ArrowNames.West)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 30)
        basic.pause(970)
        maqueen.motorStop(maqueen.Motors.All)
    } else if (receivedString == "Sound") {
        basic.showIcon(IconNames.EighthNote)
        music.play(music.stringPlayable("E G B A B C5 B C5 ", 250), music.PlaybackMode.UntilDone)
    } else if (receivedString == "Talk") {
        basic.showLeds(`
            # # # . .
            # # # . .
            # # # . .
            . . . # .
            . . . . #
            `)
        music.play(music.createSoundExpression(WaveShape.Triangle, 4216, 2494, 255, 255, 1500, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    }
    basic.pause(500)
})
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.SmallSquare)
