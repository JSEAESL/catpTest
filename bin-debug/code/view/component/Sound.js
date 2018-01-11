/**
 * cy
 * 20180103
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    var Sound = (function () {
        function Sound(cd) {
            this.play_music(cd);
        }
        Sound.prototype.play_music = function (data) {
            if (!data) {
                if (Sound.now_music) {
                    data = { "name": Sound.now_music };
                }
                else {
                    return;
                }
            }
            var isef = data.type && data.type == "ef";
            var isyuyin = data.type && data.type == "yuyin";
            if (isef || isyuyin) {
                if (!mx.MX_COMMON.MUSIC_EFFECT_PLAY) {
                    return;
                }
                if (!data.name) {
                    if (Sound.now_yuyin && Sound.now_yuyin != "close") {
                        data = { "name": Sound.now_yuyin, "type": "yuyin" };
                    }
                    else {
                        return;
                    }
                }
                if (isyuyin) {
                    if (Sound.now_yuyin) {
                        return;
                    }
                    this.close_music(true); //关闭正在播放的音乐
                }
            }
            else {
                if (!mx.MX_COMMON.MUSIC_PLAY) {
                    return;
                }
                if (Sound.channel) {
                    if (this.c_music && this.c_music.name == data.name) {
                        return;
                    }
                    this.close_music(); //关闭正在播放的音乐
                }
            }
            this.c_music = data;
            var sound = RES.getRes(data.name + "_mp3");
            if (sound) {
                this.start_music(sound);
            }
            else {
                RES.getResAsync(data.name + "_mp3", this.load_music, this); //方式1、2异步加载*/
            }
        };
        Sound.prototype.start_music = function (sound) {
            var _this = this;
            this.unique_code = new Date().getTime() + "";
            if (sound.type == "effect") {
                if (this.c_music && this.c_music.type == "yuyin" && Sound.now_yuyin != "") {
                    sound = null;
                    return;
                }
                if (this.c_music && this.c_music.type == "yuyin") {
                    Sound.now_yuyin = this.c_music.name;
                }
                Sound.channel_ef = sound.play(0, 1); //从起始位置循环播放
                Sound.channel_ef.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                    _this.close_music(true);
                }, this);
                Sound.channel_ef.volume = 1;
                var test_music = Sound.channel_ef;
                var ph_music = test_music.context;
                if (ph_music && ph_music.state != "running") {
                    this.c_music = null;
                }
                Main.HOLD_MUSIC.push(this);
            }
            else {
                if (Sound.now_music != "" && Sound.channel) {
                    sound = null;
                    return;
                }
                Sound.now_music = this.c_music.name;
                Sound.channel = sound.play(0, 0); //从起始位置循环播放
                Sound.channel.volume = 0.3;
                var test_music = Sound.channel;
                var ph_music = test_music.context;
                if (ph_music && ph_music.state != "running") {
                    this.c_music = null;
                }
                Main.HOLD_MUSIC.push(this);
            }
        };
        Sound.prototype.load_music = function (data, key) {
            if (data) {
                if (data.type == "effect") {
                    var c_ef = key.split("_mp3")[0];
                    if (this.c_music && this.c_music.name != c_ef) {
                        return;
                    }
                }
                else {
                    this.c_music = { "name": key.split("_mp3")[0] };
                }
                this.start_music(data);
                if (mx.MX_COMMON.MUSIC_STATE == 0) {
                    mx.MX_COMMON.MUSIC_STATE = 1;
                }
            }
        };
        Sound.prototype.close_music = function (ef) {
            if (ef) {
                if (Sound.channel_ef) {
                    Sound.channel_ef.stop();
                    Sound.channel_ef = null;
                }
                Sound.now_yuyin = "";
            }
            else {
                if (Sound.channel) {
                    Sound.channel.stop();
                    Sound.channel = null;
                }
            }
            if (this.c_music && this.c_music.type == "yuyin") {
                Sound.now_yuyin = "";
            }
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.REMOVE_MUSIC, this.unique_code);
        };
        Sound.now_yuyin = "";
        Sound.now_music = "";
        return Sound;
    }());
    mx.Sound = Sound;
    __reflect(Sound.prototype, "mx.Sound");
})(mx || (mx = {}));
//# sourceMappingURL=Sound.js.map